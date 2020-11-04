import re
import fileinput

from django.core import management
from django.core.management.base import BaseCommand
from django.core.management.utils import get_random_secret_key

from core import settings

SETTINGS_PATH = '/app/src/core/settings.py'
KEY_PATTERN = r'SECRET_KEY ='


class Command(BaseCommand):
    help = 'run this to set everything up'

    def add_arguments(self, parser):
        pass

    def say(self, what):
        self.stdout.write(what)

    def handle(self, *args, **kwargs):
        # generate secret key and insert into settings.py
        self.say('\nshuffling django secret...')
        key = get_random_secret_key()
        self.say('old key:  {}'.format(settings.SECRET_KEY))
        self.say('new key:  {}'.format(key))

        keyline = 'SECRET_KEY = \'{}\'  # replaced by setup'.format(key)
        for x in fileinput.input(SETTINGS_PATH, inplace=True):
            print(keyline) if re.match(KEY_PATTERN, x) else print(x, end='')

        # create a user
        # TODO

        # collect static files for API browsing
        management.call_command('collectstatic', '--no-input')

        # if db.sqlite3 exists, back it up with a timestamp
        # TODO

        # clear / update the database
        management.call_command('migrate')
        management.call_command('purge')  # refine this once we have userdata

        # scan the library
        management.call_command('scan')
