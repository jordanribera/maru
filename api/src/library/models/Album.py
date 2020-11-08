from autoslug import AutoSlugField
from django.db import models
from core.models import BaseModel
from library.models import Artist


class Album(BaseModel):
    name = models.CharField(max_length=128)
    slug = AutoSlugField(
        populate_from='name',
        unique=True,
    )
    artist = models.ForeignKey(
        Artist,
        related_name='albums',
        on_delete=models.CASCADE
    )
    year = models.IntegerField(null=True)

    class Meta:
        ordering = ('artist__name', 'year', 'name',)

    def __str__(self):
        return self.name

    @property
    def cover(self):
        prime = self.artwork.filter(rel='folder_cover').first()
        if prime:
            return prime.artwork
