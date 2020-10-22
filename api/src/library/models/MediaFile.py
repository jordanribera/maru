import mutagen
import os.path
from django.db import models

from core.models import BaseModel


class MediaFile(BaseModel):
    path = models.CharField(max_length=256)
    md5hash = models.CharField(max_length=32, unique=True)
    sha1hash = models.CharField(max_length=40, unique=True)
    content_type = models.CharField(max_length=32)

    def __init__(self, *args, **kwargs):
        super(MediaFile, self).__init__(*args, **kwargs)
        self._tags = {}

    @property
    def tags(self):
        if not self._tags:
            self._tags = {
                key: value
                for (key, value,) in mutagen.File(self.path).tags.items()
            }
        return self._tags

    @property
    def extension(self):
        return os.path.splitext(self.path)[1]

    @property
    def url(self):
        return '/media/{}'.format(self.sha1hash)

    @property
    def artist(self):
        artist_keys = ['artist', 'ARTIST', 'TPE1']
        for key in artist_keys:
            if key in self.tags.keys():
                return str(self.tags[key][0])
        return None

    @property
    def album(self):
        album_keys = ['album', 'ALBUM', 'TALB']
        for key in album_keys:
            if key in self.tags.keys():
                return str(self.tags[key][0])
        return None

    @property
    def title(self):
        title_keys = ['title', 'TITLE', 'TIT2']
        for key in title_keys:
            if key in self.tags.keys():
                return str(self.tags[key][0])
        return None

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
