import hashlib
import mimetypes
import os
import re
from shutil import copy

from django.core.management.base import BaseCommand

from library.models import Artist
from library.models import Artwork
from library.models import Album
from library.models import Track
from library.models import MediaFile

MEDIA_PATH = '/media'
ARTWORK_CACHE = '/artwork'
BUFFER_SIZE = 65536


MEDIA = ['mp3', 'flac']
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


class Command(BaseCommand):
    help = 'Import /media'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        # check for, notify about files that have gone away
        for root, dirs, files in os.walk(MEDIA_PATH):
            for f in files:
                if MEDIA_FILE.match(f):
                    song_path = os.path.join(root, f)
                    self.scan_song(song_path)

    def scan_artist(self, name):
        # get or create, return an Artist
        artist, new_artist = Artist.objects.get_or_create(name=name)
        if new_artist:
            self.stdout.write('new artist: {}'.format(artist.name))
        return artist

    def scan_album(self, title, artist, year):
        # get or create, return an Album
        album, new_album = Album.objects.get_or_create(
            name=title,
            artist=artist,
            year=year,
        )
        if new_album:
            self.stdout.write('new album: {} - {} ({})'.format(
                album.artist.name,
                album.name,
                album.year,
            ))

        # TODO: look for artwork, call self.scan_artwork()
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

        artist = self.scan_artist(mf.artist)
        album = self.scan_album(mf.album, artist, mf.year)
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

        self.scan_for_artwork(song)

        if new_song:
            self.stdout.write('new song: {}'.format(song.title))
        mf.track = song
        mf.save()

    def scan_for_artwork(self, song):
        # get or create, return an Artwork
        song_dir = os.path.dirname(song.media_file.path)

        for root, dirs, files in os.walk(song_dir):
            for f in files:
                if COVER_FILE.match(f):
                    cover_path = os.path.join(root, f)
                    cover = self.scan_artwork(path=cover_path)
                    # TODO: make link
                    if not song.album.artwork:
                        song.album.artwork = cover
                        song.album.save()
                        self.stdout.write('link cover: {} <{}>'.format(
                            cover.path,
                            song.album,
                        ))
                elif ART_FILE.match(f):
                    art_path = os.path.join(root, f)
                    self.scan_artwork(path=art_path)  # art =
                    # TODO: make link

        # TODO: extract embedded art

    def scan_artwork(self, path=None, bytes=None, extension=None):
        sha1 = hashlib.sha1()
        if path:
            extension = os.path.splitext(path)[1]
            with open(path, 'rb') as f:
                # TODO: try to combine the read operation for hash+copy/write
                while True:
                    data = f.read(BUFFER_SIZE)
                    if not data:
                        break
                    sha1.update(data)
        elif bytes:
            # TODO: sha1
            pass

        cache_path = os.path.join(ARTWORK_CACHE, '{}{}'.format(
            sha1.hexdigest(),
            extension,
        ))

        if not os.path.isfile(cache_path):
            if path:
                # copy the file into the cache
                copy(path, cache_path)
            elif bytes:
                # write the bites into the cache
                pass

        art, new_art = Artwork.objects.update_or_create(
            sha1hash=sha1.hexdigest(),
            defaults={
                'path': cache_path,
                'content_type': mimetypes.guess_type(cache_path)[0],
            }
        )
        if new_art:
            self.stdout.write('new artwork: {}'.format(art.path))
        return art
