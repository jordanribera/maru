from django.core.management.base import BaseCommand

import os
import re

from library.models import Album
from library.tasks import import_artwork


MEDIA_PATH = '/media'
BUFFER_SIZE = 65536

ART_EXT = ['jpg', 'jpeg', 'png']
ART_NAME = ['cover', 'artwork', 'album', 'folder']

REGEX = re.compile(
    '({}).({})$'.format('|'.join(ART_NAME), '|'.join(ART_EXT)),
    flags=re.IGNORECASE,
)

MIME_EXTENSIONS = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
}


class Command(BaseCommand):
    help = 'Import /media'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        self.stdout.write('= = = = = = = = = = = = = = = =')
        self.stdout.write('scanning media folder {}'.format(MEDIA_PATH))
        self.stdout.write('= = = = = = = = = = = = = = = =')

        # catalog cover.jpg etc
        for root, dirs, files in os.walk(MEDIA_PATH):
            for file in files:
                if REGEX.match(file):
                    artwork_path = '{}/{}'.format(root, file)
                    import_artwork.delay(artwork_path)

        # fetch artwork from first track (eventually replace with fallback)
        artless_albums = Album.objects.filter(artwork__isnull=True).all()
        for album in artless_albums:
            artwork = album.tracks.first().media_file.artwork
            if artwork:
                filename = 'cover.{}'.format(MIME_EXTENSIONS[artwork['mime']])
                path = '{}/{}'.format(
                    os.path.dirname(album.tracks.first().media_file.path),
                    filename,
                )
                self.stdout.write('extracting to {}'.format(path))
                with open(path, 'wb') as out:
                    out.write(artwork['data'])

                import_artwork.delay(path)
