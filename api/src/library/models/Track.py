from django.db import models
from core.models import BaseModel
from library.models import Artist
from library.models import Album


class Track(BaseModel):
    artist = models.ForeignKey(
        Artist,
        related_name='tracks',
        on_delete=models.CASCADE,
    )
    album = models.ForeignKey(
        Album,
        related_name='tracks',
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=255)
    # album_artist = models.CharField(max_length=128)
    # composer = models.CharField(max_length=128)
    # genre = models.CharField(max_length=128)

    tracknumber = models.IntegerField()
    tracktotal = models.IntegerField()
    discnumber = models.IntegerField(default=1)
    disctotal = models.IntegerField(default=1)

    class Meta:
        ordering = (
            'artist__name',
            'album__name',  # album__year
            'discnumber',
            'tracknumber',
        )

    def __str__(self):
        return self.title
