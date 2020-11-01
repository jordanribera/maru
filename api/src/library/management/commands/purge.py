from django.core.management.base import BaseCommand
# from django.core.management.base import CommandError

from library.models import Artist
from library.models import Album
from library.models import Track
from library.models import MediaFile
from library.models import Artwork


class Command(BaseCommand):
    help = 'Empty metadata'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **kwargs):
        self.stdout.write('= = = = = = = = = = = = = = = = = = = =')
        self.stdout.write('deleting everything (except your music)')
        self.stdout.write('= = = = = = = = = = = = = = = = = = = =')

        Artist.objects.all().delete()
        Album.objects.all().delete()
        Track.objects.all().delete()
        MediaFile.objects.all().delete()
        Artwork.objects.all().delete()
