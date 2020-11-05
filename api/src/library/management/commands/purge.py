from collections import Counter
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
        self.stdout.write('deleting everything (except your music)')

        results = []
        results.append(Artist.objects.all().delete())
        results.append(Album.objects.all().delete())
        results.append(Track.objects.all().delete())
        results.append(MediaFile.objects.all().delete())
        results.append(Artwork.objects.all().delete())

        counter = Counter()
        for c in [Counter(r[1]) for r in results]:
            counter.update(c)

        longest_value = 1
        if counter.values():
            longest_value = len(str(max(counter.values())))

        for k in counter.keys():
            self.stdout.write('  {} {} {}'.format(
                self.style.ERROR('destroyed'),
                str(counter[k]).rjust(longest_value, ' '),
                k,
            ))
