from django.db import models
from core.models import BaseModel


class Artist(BaseModel):
    name = models.CharField(max_length=128)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name
