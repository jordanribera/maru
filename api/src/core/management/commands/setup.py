from django.core.management.base import BaseCommand
from django.core.management.utils import get_random_secret_key

import re
import fileinput

SETTINGS_PATH = '/app/src/core/settings.py'
SECRET_KEY_PATTERN = r'SECRET KEY ='


class Command(BaseCommand):
    help = 'run this to set everything up'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        # generate secret key and insert into settings.py
        fresh_key = get_random_secret_key()
        self.stdout.write('using secret key: [ {} ]'.format(fresh_key))

        for line in fileinput.input(SETTINGS_PATH, inplace=True):
            if re.match(SECRET_KEY_PATTERN, line):
                self.stdout.write(line)
                print(line, end='')
                print('foooo', end='')
            else:
                print(line, end='')

        # create a user

        # collect static files for API browsing
        # management.call_command('collectstatic')

        # scan the library
        # management.call_command('import')
        # management.call_command('artwork')
