import os.path
from django.db import models

from core.models import BaseModel


class Artwork(BaseModel):
    path = models.CharField(max_length=256)
    sha1hash = models.CharField(max_length=40, unique=True)
    content_type = models.CharField(max_length=32)

    @property
    def dirname(self):
        return os.path.dirname(self.path)

    @property
    def extension(self):
        return os.path.splitext(self.path)[1]

    @property
    def filename(self):
        return os.path.basename(self.path)

    @property
    def url(self):
        return '/artwork/{}'.format(self.sha1hash)
