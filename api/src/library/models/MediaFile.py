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
                for (key, value,) in mutagen.File(self.path).tags
            }
        return self._tags

    @property
    def extension(self):
        return os.path.splitext(self.path)

    @property
    def url(self):
        return '/media/{}'.format(self.sha1hash)

    @property
    def artist(self):
        return self.tags.get('artist', '<unknown>')

    @property
    def album(self):
        return self.tags.get('album', '<unknown>')

    @property
    def title(self):
        return self.tags.get('title', '<unknown>')
