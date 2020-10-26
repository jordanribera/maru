from library.serializers import MediaFileSerializer
from library.models import MediaFile
from library.models import Artist
from library.models import Album
from library.models import Track
from library.documents import TrackDocument
from library.serializers import TrackDocumentSerializer
from library.serializers import ArtistSerializer
from library.serializers import AlbumSerializer
from library.serializers import TrackSerializer

from rest_framework.viewsets import ReadOnlyModelViewSet
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    DefaultOrderingFilterBackend,
    FilteringFilterBackend,
    OrderingFilterBackend,
    SearchFilterBackend,
)


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


class TrackDocumentView(DocumentViewSet):
    document = TrackDocument
    serializer_class = TrackDocumentSerializer
    lookup_field = 'sha1hash'
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,  # this was in the example
        SearchFilterBackend,
    ]

    search_fields = (
        'artist',
        'album',
        'title',
    )

    filter_fields = {
        'artist': 'artist',
        'album': 'album',
    }

    ordering_fields = {
        'artist': 'artist',
        'album': 'album',
        'title': 'title',
    }

    ordering = ('artist', 'album', 'discnumber', 'tracknumber')
