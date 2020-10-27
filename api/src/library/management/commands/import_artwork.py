from django.core.management.base import BaseCommand

import os
import re

from library.tasks import import_artwork


MEDIA_PATH = '/media'
BUFFER_SIZE = 65536

ART_EXT = ['jpg', 'jpeg', 'png']
ART_NAME = ['cover', 'artwork', 'album']

REGEX = re.compile(
    '({}).({})$'.format('|'.join(ART_NAME), '|'.join(ART_EXT)),
    flags=re.IGNORECASE,
)


class Command(BaseCommand):
    help = 'Import /media'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        self.stdout.write('= = = = = = = = = = = = = = = =')
        self.stdout.write('scanning media folder {}'.format(MEDIA_PATH))
        self.stdout.write('= = = = = = = = = = = = = = = =')

        for root, dirs, files in os.walk(MEDIA_PATH):
            for file in files:
                if REGEX.match(file):
                    artwork_path = '{}/{}'.format(root, file)
                    import_artwork.delay(artwork_path)
