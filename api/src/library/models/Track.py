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

    tracknumber = models.IntegerField(null=True)
    tracktotal = models.IntegerField(null=True)
    discnumber = models.IntegerField(null=True)
    disctotal = models.IntegerField(null=True)
    genre = models.CharField(max_length=128, null=True)

    class Meta:
        ordering = (
            'artist__name',
            'album__year',
            'album__name',
            'discnumber',
            'tracknumber',
        )

    def __str__(self):
        return self.title
