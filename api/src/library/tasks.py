import hashlib
import mimetypes
from celery import shared_task

from library.models import MediaFile
from library.models import Artist
from library.models import Album
from library.models import Track

BUFFER_SIZE = 65536


@shared_task
def import_file(file_path):
    print('importing {}'.format(file_path))

    sha1 = hashlib.sha1()
    with open(file_path, 'rb') as f:
        while True:
            data = f.read(BUFFER_SIZE)
            if not data:
                break
            sha1.update(data)

    MediaFile.objects.update_or_create(
        sha1hash=sha1.hexdigest(),
        defaults={
            'path': file_path,
            'content_type': mimetypes.guess_type(file_path)[0],
        }
    )


@shared_task
def new_import_file(file_path):
    print('importing {}'.format(file_path))

    sha1 = hashlib.sha1()
    with open(file_path, 'rb') as f:
        while True:
            data = f.read(BUFFER_SIZE)
            if not data:
                break
            sha1.update(data)

    # eventually instantiate, use, link, save
    f, new_file = MediaFile.objects.update_or_create(
        sha1hash=sha1.hexdigest(),
        defaults={
            'path': file_path,
            'content_type': mimetypes.guess_type(file_path)[0],
        }
    )

    artist, new_artist = Artist.objects.get_or_create(name=f.artist)
    album, new_album = Album.objects.get_or_create(name=f.album, artist=artist)

    track, new_track = Track.objects.get_or_create(
        artist=artist,
        album=album,
        title=f.title,
        tracknumber=f.tracknumber,
        tracktotal=f.tracktotal,
        discnumber=f.discnumber,
        disctotal=f.disctotal,
    )

    f.track = track
    f.save()
