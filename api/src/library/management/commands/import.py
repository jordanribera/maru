from django.core.management.base import BaseCommand
# from django.core.management.base import CommandError

import os
from glob import glob

from library.tasks import import_file


MEDIA_PATH = '/media'
BUFFER_SIZE = 65536


class Command(BaseCommand):
    help = 'Import /media'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        self.stdout.write('= = = = = = = = = = = = = = = =')
        self.stdout.write('scanning media folder {}'.format(MEDIA_PATH))
        self.stdout.write('= = = = = = = = = = = = = = = =')

        flac_files = [
            y for x in os.walk(MEDIA_PATH)
            for y in glob(os.path.join(x[0], '*.flac'))
        ]
        mp3_files = [
            y for x in os.walk(MEDIA_PATH)
            for y in glob(os.path.join(x[0], '*.mp3'))
        ]

        media_files = sorted(flac_files + mp3_files)

        for media_file in media_files:
            import_file.delay(media_file)
