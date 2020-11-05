import os.path
from django.db import models

from core.models import BaseModel


ARTWORK_RELATIONSHIPS = [
    ('folder_cover', 'Cover in folder'),
    ('folder_misc', 'Misc in folder'),
    ('embedded', 'Embedded'),
    ('unknown', 'Unknown'),
]


class Artwork(BaseModel):
    path = models.CharField(max_length=256)
    sha1hash = models.CharField(max_length=40, unique=True)
    content_type = models.CharField(max_length=32)

    def __str__(self):
        return self.sha1hash

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


class AlbumArtwork(BaseModel):
    album = models.ForeignKey(
        'Album',
        related_name='artwork',
        on_delete=models.CASCADE,
    )
    artwork = models.ForeignKey('Artwork', on_delete=models.CASCADE)
    rel = models.CharField(max_length=16, choices=ARTWORK_RELATIONSHIPS)

    class Meta:
        unique_together = ['album', 'artwork']


class SongArtwork(BaseModel):
    song = models.ForeignKey(
        'Track',
        related_name='artwork',
        on_delete=models.CASCADE,
    )
    artwork = models.ForeignKey('Artwork', on_delete=models.CASCADE)
    rel = models.CharField(max_length=16, choices=ARTWORK_RELATIONSHIPS)

    class Meta:
        unique_together = ['song', 'artwork']
