from autoslug import AutoSlugField
from django.db import models
from core.models import BaseModel
from library.models import Artist


class Album(BaseModel):
    name = models.CharField(max_length=128)
    slug = AutoSlugField(
        populate_from='name',
        unique_with='artist',
    )
    artist = models.ForeignKey(
        Artist,
        related_name='albums',
        on_delete=models.CASCADE
    )
    year = models.IntegerField()
    artwork = models.OneToOneField(
        'Artwork',
        related_name='album',
        on_delete=models.SET_NULL,
        null=True,
    )

    class Meta:
        ordering = ('artist__name', 'year', 'name',)

    def __str__(self):
        return '{} (#{})'.format(self.name, self.slug)
