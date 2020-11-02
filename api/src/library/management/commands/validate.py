from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'check the library for problems'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        pass
