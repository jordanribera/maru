from django.db import models

from core.models import BaseModel


class Playlist(BaseModel):
    name = models.CharField(max_length=256)
    items = models.ManyToManyField('Track', through='PlaylistItem')
    # related_name 'songs' is presented in PlaylistItem order

    def __str__(self):
        return self.name

    def add(self, tracks, position=None):
        if position:
            # take every PlaylistItem of position>=position and add len(tracks)
            shifting = PlaylistItem.objects.filter(
                playlist=self,
                position__gte=position,
            ).order_by('-position')
            for item in shifting:
                item.position = item.position + len(tracks)
                item.save()

        pointer = position or self.end_position
        for track in tracks:
            PlaylistItem.objects.create(
                playlist=self,
                track=track,
                position=pointer,
            )
            pointer = pointer + 1

    def remove(self, index):
        pass

    @property
    def end_position(self):
        if self.items.last():
            return self.items.last().position + 1
        return 0


class PlaylistItem(BaseModel):
    playlist = models.ForeignKey(
        'Playlist',
        on_delete=models.CASCADE,
        related_name='songs',
    )
    track = models.ForeignKey(
        'Track',
        on_delete=models.CASCADE,
        related_name='playlists',
    )
    position = models.IntegerField()

    class Meta:
        ordering = ['playlist__name', 'position']
        unique_together = ['playlist', 'position']

    def __str__(self):
        return '{}: {}'.format(self.position, self.track.title)
