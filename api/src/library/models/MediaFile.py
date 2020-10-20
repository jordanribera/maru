from django.db import models

from core.models import BaseModel


class MediaFile(BaseModel):
    path = models.CharField(max_length=256)
    md5hash = models.CharField(max_length=32, unique=True)
    sha1hash = models.CharField(max_length=40, unique=True)
