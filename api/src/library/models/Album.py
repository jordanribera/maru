from autoslug import AutoSlugField
from django.db import models
from django.db.models.functions import Lower
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
        ordering = (Lower('artist__name'), 'year', Lower('name'),)

    def __str__(self):
        return self.name

    @property
    def cover(self):
        prime = self.artwork.filter(rel='folder_cover').first()
        if prime:
            return prime.artwork
        extracted = self.artwork.filter(rel='extracted').first()
        if extracted:
            return extracted.artwork
