from autoslug import AutoSlugField
from django.db import models
from django.db.models.functions import Lower
from core.models import BaseModel


class Artist(BaseModel):
    name = models.CharField(max_length=128)
    slug = AutoSlugField(populate_from='name', unique=True)

    class Meta:
        ordering = (Lower('name'),)

    def __str__(self):
        return self.name
