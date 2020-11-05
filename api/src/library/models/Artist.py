from autoslug import AutoSlugField
from django.db import models
from core.models import BaseModel


class Artist(BaseModel):
    name = models.CharField(max_length=128)
    slug = AutoSlugField(populate_from='name')

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name
