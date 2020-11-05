import mutagen
import os.path
import dateutil.parser as date_parser
from django.db import models

from core.models import BaseModel


class MediaFile(BaseModel):
    path = models.CharField(max_length=256)
    sha1hash = models.CharField(max_length=40, unique=True)
    content_type = models.CharField(max_length=32)

    # upgrade this to ForeignKey to support multiple file sources per track
    track = models.OneToOneField(
        'Track',
        related_name='media_file',
        on_delete=models.CASCADE,
        null=True,
    )

    def __str__(self):
        return self.sha1hash

    def __init__(self, *args, **kwargs):
        super(MediaFile, self).__init__(*args, **kwargs)
        self._tags = {}

    @property
    def tags(self):
        mfile = mutagen.File(self.path)
        if not self._tags:
            self._tags = dict()
            if mfile.tags:
                self._tags = {
                    key: value
                    for (key, value,) in mfile.tags.items()
                }
        return self._tags

    def waterfall(self, keys):
        for key in keys:
            if key in self.tags.keys():
                return str(self.tags[key][0])
        return None

    @property
    def extension(self):
        return os.path.splitext(self.path)[1]

    @property
    def filename(self):
        return os.path.basename(self.path)

    @property
    def url(self):
        return '/media/{}'.format(self.sha1hash)

    @property
    def artist(self):
        artist_keys = ['artist', 'ARTIST', 'TPE1', '©ART']
        return self.waterfall(artist_keys)

    @property
    def album(self):
        album_keys = ['album', 'ALBUM', 'TALB', '©alb']
        return self.waterfall(album_keys)

    @property
    def title(self):
        title_keys = ['title', 'TITLE', 'TIT2', '©nam']
        return self.waterfall(title_keys) or self.filename

    @property
    def year(self):
        year_keys = ['date', 'DATE', 'TDRC', '©day']
        raw = self.waterfall(year_keys)
        if raw:
            try:
                return date_parser.parse(raw).year
            except Exception:
                return None

    @property
    def length(self):
        return mutagen.File(self.path).info.length

    @property
    def tracknumber(self):
        value = self.waterfall(['tracknumber', 'TRCK', 'trkn'])
        if value and ', ' in value:  # itunes m4a format is [(1, 7)]
            return value.replace('(', '').replace(')', '').split(', ')[0]
        if value and '/' in value:
            return value.split('/')[0]
        return value

    @property
    def tracktotal(self):
        value = self.waterfall(['tracktotal', 'TRCK', 'tracknumber', 'trkn'])
        if value and ', ' in value:  # itunes m4a format is [(1, 7)]
            return value.replace('(', '').replace(')', '').split(', ')[1]
        if value and '/' in value:
            return value.split('/')[1]
        return value

    @property
    def discnumber(self):
        value = self.waterfall(['discnumber', 'TPOS', 'disk'])
        if value and ', ' in value:  # itunes m4a format is [(1, 7)]
            return value.replace('(', '').replace(')', '').split(', ')[0]
        if value and '/' in value:
            return value.split('/')[0]
        return value

    @property
    def disctotal(self):
        value = self.waterfall(['disctotal', 'TPOS', 'discnumber'])
        if value and ', ' in value:  # itunes m4a format is [(1, 7)]
            return value.replace('(', '').replace(')', '').split(', ')[1]
        if value and '/' in value:
            return value.split('/')[1]
        return value

    @property
    def genre(self):
        return self.waterfall(['genre', 'GENRE', 'TCON', '©gen'])

    @property
    def artwork(self):
        mfile = mutagen.File(self.path)
        picture = None
        if hasattr(mfile, 'pictures') and len(mfile.pictures) > 0:
            picture = mfile.pictures[0]
        else:
            picture = mfile.get('APIC') or mfile.get('APIC:')

        if not picture:
            return None

        return {
            'mime': picture.mime.lower(),
            'data': picture.data,
        }

    @property
    def problems(self):
        possible_problems = {
            'missing_artist': self.artist is None,
            'missing_album': self.album is None,
            'missing_title': self.title is None,
        }
        return [
            problem
            for problem, active in possible_problems.items()
            if active
        ]
