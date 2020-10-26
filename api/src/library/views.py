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

from rest_framework.viewsets import ModelViewSet
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    DefaultOrderingFilterBackend,
    FilteringFilterBackend,
    OrderingFilterBackend,
    SearchFilterBackend,
)


class MediaFileView(ModelViewSet):
    serializer_class = MediaFileSerializer
    queryset = MediaFile.objects.all()


class ArtistView(ModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()


class AlbumView(ModelViewSet):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()


class TrackView(ModelViewSet):
    serializer_class = TrackSerializer
    queryset = Track.objects.all()


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
