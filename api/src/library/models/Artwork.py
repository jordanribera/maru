import os.path
from django.db import models
from mutagen.id3 import PictureType

from core.models import BaseModel


ARTWORK_RELATIONSHIPS = [
    ('folder_cover', 'Cover in folder'),
    ('folder_misc', 'Misc in folder'),
    ('embedded', 'Embedded'),
    ('unknown', 'Unknown'),
]

ARTWORK_TYPES = [
    (PictureType.OTHER, 'Other'),
    (PictureType.FILE_ICON, 'File Icon'),  # I wonder if I'll ever see one
    (PictureType.OTHER_FILE_ICON, 'Other File Icon'),
    (PictureType.COVER_FRONT, 'Front Cover'),
    (PictureType.COVER_BACK, 'Back Cover'),
    (PictureType.LEAFLET_PAGE, 'Leaflet Page'),
    (PictureType.MEDIA, 'Media'),
    (PictureType.LEAD_ARTIST, 'Lead Artist'),
    (PictureType.ARTIST, 'Artist'),
    (PictureType.CONDUCTOR, 'Conductor'),
    (PictureType.BAND, 'Band'),
    (PictureType.COMPOSER, 'Composer'),
    (PictureType.LYRICIST, 'Lyricist'),
    (PictureType.RECORDING_LOCATION, 'Recording Location'),
    (PictureType.DURING_RECORDING, 'During Recording'),
    (PictureType.DURING_PERFORMANCE, 'During Performance'),
    (PictureType.SCREEN_CAPTURE, 'Screen Capture'),
    (PictureType.FISH, 'Fish'),  # what??
    (PictureType.ILLUSTRATION, 'Illustration'),
    (PictureType.BAND_LOGOTYPE, 'Band Logo'),
    (PictureType.PUBLISHER_LOGOTYPE, 'Publisher Logo'),
]


class Artwork(BaseModel):
    path = models.CharField(max_length=256)
    sha1hash = models.CharField(max_length=40, unique=True)
    content_type = models.CharField(max_length=32)

    def __str__(self):
        return self.sha1hash

    @property
    def dirname(self):
        return os.path.dirname(self.path)

    @property
    def extension(self):
        return os.path.splitext(self.path)[1]

    @property
    def filename(self):
        return os.path.basename(self.path)

    @property
    def url(self):
        return '/artwork/{}'.format(self.sha1hash)


class AlbumArtwork(BaseModel):
    album = models.ForeignKey(
        'Album',
        related_name='artwork',
        on_delete=models.CASCADE,
    )
    artwork = models.ForeignKey('Artwork', on_delete=models.CASCADE)
    rel = models.CharField(max_length=16, choices=ARTWORK_RELATIONSHIPS)

    class Meta:
        unique_together = ['album', 'artwork']


class SongArtwork(BaseModel):
    song = models.ForeignKey(
        'Track',
        related_name='artwork',
        on_delete=models.CASCADE,
    )
    artwork = models.ForeignKey('Artwork', on_delete=models.CASCADE)
    rel = models.CharField(max_length=16, choices=ARTWORK_RELATIONSHIPS)

    class Meta:
        unique_together = ['song', 'artwork']
