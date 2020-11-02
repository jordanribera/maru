from django.core.management.base import BaseCommand

import os
from glob import glob

from library.tasks import import_file


class Command(BaseCommand):
    help = 'check the library for problems'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        # generate secret key and insert into settings.py
        fresh_key = get_random_secret_key()

        # create a user

        # collect static files for API browsing
        management.call_command('collectstatic')

        # scan the library
        management.call_command('import')
        management.call_command('artwork')
