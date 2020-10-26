from django.db import models
from core.models import BaseModel
from library.models import Artist


class Album(BaseModel):
    name = models.CharField(max_length=128)
    artist = models.ForeignKey(
        Artist,
        related_name='albums',
        on_delete=models.CASCADE
    )
    year = models.IntegerField()
    # artwork = ?

    class Meta:
        ordering = ('artist__name', 'year', 'name',)

    def __str__(self):
        return '{} - {}'.format(self.artist.name, self.name)
