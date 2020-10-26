from library.serializers import MediaFileSerializer
from library.models import MediaFile
from library.models import Artist
from library.models import Album
from library.models import Track
from library.serializers import ArtistSerializer
from library.serializers import AlbumSerializer
from library.serializers import TrackSerializer

from rest_framework.viewsets import ReadOnlyModelViewSet


class MediaFileView(ReadOnlyModelViewSet):
    serializer_class = MediaFileSerializer
    queryset = MediaFile.objects.all()


class ArtistView(ReadOnlyModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()


class AlbumView(ReadOnlyModelViewSet):
    serializer_class = AlbumSerializer

    def get_queryset(self):
        queryset = Album.objects.all()

        artist = self.request.query_params.get('artist', None)
        if artist is not None:
            queryset = queryset.filter(artist__name__iexact=artist)

        return queryset


class TrackView(ReadOnlyModelViewSet):
    serializer_class = TrackSerializer

    def get_queryset(self):
        queryset = Track.objects.all()

        artist = self.request.query_params.get('artist', None)
        if artist is not None:
            queryset = queryset.filter(artist__name__iexact=artist)

        album = self.request.query_params.get('album', None)
        if album is not None:
            queryset = queryset.filter(album__name__iexact=album)

        return queryset
