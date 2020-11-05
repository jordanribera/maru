import hashlib
import mimetypes
import os
import re
from datetime import datetime
from shutil import copy

from django.core.management.base import BaseCommand

from library.models import Artist
from library.models import Artwork
from library.models import AlbumArtwork
from library.models import SongArtwork
from library.models import Album
from library.models import Track
from library.models import MediaFile

MEDIA_PATH = '/media'
ARTWORK_CACHE = '/artwork'
BUFFER_SIZE = 65536


MEDIA = ['mp3', 'flac', 'm4a']
MEDIA_FILE = re.compile(
    r'.+\.({})$'.format('|'.join(MEDIA)),
    flags=re.IGNORECASE,
)

ART = {
    'names': ['cover', 'artwork', 'album', 'folder'],
    'extensions': ['jpg', 'jpeg', 'png'],
}
COVER_FILE = re.compile(
    r'({})\.({})$'.format(
        '|'.join(ART['names']),
        '|'.join(ART['extensions']),
    ),
    flags=re.IGNORECASE,
)
ART_FILE = re.compile(
    r'.+\.({})$'.format('|'.join(ART['extensions'])),
    flags=re.IGNORECASE,
)

MIME_EXTENSIONS = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}


class Command(BaseCommand):
    help = 'Import /media'

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        self.problems = []
        start = datetime.now()
        # check for, notify about files that have gone away
        for root, dirs, files in os.walk(MEDIA_PATH):
            for f in files:
                if MEDIA_FILE.match(f):
                    song_path = os.path.join(root, f)
                    self.scan_song(song_path)  # worthwhile to move to celery?
        end = datetime.now()
        self.stdout.write('time: {}'.format(end - start))

        if len(self.problems) > 0:
            self.stdout.write('\nproblems:')
            for p in self.problems:
                self.stdout.write('  {} [{}] {}'.format(
                    repr(p),
                    '\', \''.join(self.style.ERROR(p) for p in p.problems),
                    p.path,
                ))

    def scan_artist(self, name):
        # get or create, return an Artist
        artist, new_artist = Artist.objects.get_or_create(name=name)
        if new_artist:
            self.stdout.write('  {} {}'.format(
                self.style.SUCCESS('new'),
                repr(artist),
            ))
        return artist

    def scan_album(self, title, artist, year):
        # get or create, return an Album
        album, new_album = Album.objects.get_or_create(
            name=title,
            artist=artist,
            year=year,
        )
        if new_album:
            self.stdout.write('  {} {}'.format(
                self.style.SUCCESS('new'),
                repr(album),
            ))
        return album

    def scan_song(self, path):
        # get or create, return a Track
        self.stdout.write('scanning {}'.format(path))

        sha1 = hashlib.sha1()
        with open(path, 'rb') as f:
            while True:
                data = f.read(BUFFER_SIZE)
                if not data:
                    break
                sha1.update(data)

        mf, new_file = MediaFile.objects.update_or_create(
            sha1hash=sha1.hexdigest(),
            defaults={
                'path': path,
                'content_type': mimetypes.guess_type(path)[0],
            }
        )
        if new_file:
            self.stdout.write('  {} {}'.format(
                self.style.SUCCESS('new'),
                repr(mf),
            ))
        if mf.problems:
            self.stdout.write('  {} [\'{}\']'.format(
                'problems:',
                '\', \''.join(self.style.ERROR(p) for p in mf.problems),
            ))
            self.problems.append(mf)
            return

        artist = self.scan_artist(mf.artist)
        album = self.scan_album(mf.album, artist, mf.year)
        try:
            song, new_song = Track.objects.get_or_create(
                artist=artist,
                album=album,
                title=mf.title,
                tracknumber=mf.tracknumber,
                tracktotal=mf.tracktotal,
                discnumber=mf.discnumber,
                disctotal=mf.disctotal,
                genre=mf.genre,
            )

        except Exception:
            import pdb
            pdb.set_trace()

        mf.track = song
        mf.save()

        self.scan_for_artwork(song)

        if new_song:
            self.stdout.write('  {} {}'.format(
                self.style.SUCCESS('new'),
                repr(song),
            ))

    def scan_for_artwork(self, song):
        # get or create, return an Artwork
        song_dir = os.path.dirname(song.media_file.path)

        for root, dirs, files in os.walk(song_dir):
            for f in files:
                art = None
                art_path = os.path.join(root, f)
                relationship = 'unknown'
                if COVER_FILE.match(f):
                    art = self.scan_artwork(path=art_path)
                    relationship = 'folder_cover'
                elif ART_FILE.match(f):
                    art = self.scan_artwork(path=art_path)  # art =
                    relationship = 'folder_misc'

                if art:
                    link, new_link = AlbumArtwork.objects.get_or_create(
                        album=song.album,
                        artwork=art,
                        rel=relationship,
                    )
                    if new_link:
                        self.stdout.write('  {} link: {} {}'.format(
                            self.style.SUCCESS('new'),
                            repr(art),
                            repr(song.album),
                        ))

        if song.media_file.artwork:
            extracted = self.scan_artwork(
                bytes=song.media_file.artwork['data'],
                extension=MIME_EXTENSIONS.get(
                    song.media_file.artwork['mime'],
                    'jpg',
                )
            )
            link, new_link = SongArtwork.objects.get_or_create(
                song=song,
                artwork=extracted,
                rel='extracted',
            )
            if new_link:
                self.stdout.write('  {} link: {} {}'.format(
                    self.style.SUCCESS('new'),
                    repr(art),
                    repr(song),
                ))

    def scan_artwork(self, path=None, bytes=None, extension=None):
        sha1 = hashlib.sha1()
        if path:
            extension = MIME_EXTENSIONS[mimetypes.guess_type(path)[0]]
            with open(path, 'rb') as f:
                # TODO: try to combine the read operation for hash+copy/write
                while True:
                    data = f.read(BUFFER_SIZE)
                    if not data:
                        break
                    sha1.update(data)
        elif bytes:
            sha1.update(bytes)

        cache_path = os.path.join(ARTWORK_CACHE, '{}.{}'.format(
            sha1.hexdigest(),
            extension,
        ))

        if not os.path.isfile(cache_path):
            if path:
                copy(path, cache_path)
            elif bytes:
                with open(cache_path, 'wb') as out:
                    out.write(bytes)
                pass

        art, new_art = Artwork.objects.update_or_create(
            sha1hash=sha1.hexdigest(),
            defaults={
                'path': cache_path,
                'content_type': mimetypes.guess_type(cache_path)[0],
            }
        )

        extracted_tag = self.style.WARNING(' (extracted)') if bytes else ''
        if new_art:
            self.stdout.write('  {} {}{}'.format(
                self.style.SUCCESS('new'),
                repr(art),
                extracted_tag,
            ))
        return art
