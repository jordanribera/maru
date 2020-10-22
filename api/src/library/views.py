from library.serializers import MediaFileSerializer
from library.models import MediaFile
from library.documents import TrackDocument
from library.serializers import TrackSerializer

from rest_framework.viewsets import ModelViewSet
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import FilteringFilterBackend
from django_elasticsearch_dsl_drf.filter_backends import OrderingFilterBackend
from django_elasticsearch_dsl_drf.filter_backends import SearchFilterBackend


class MediaFileView(ModelViewSet):
    serializer_class = MediaFileSerializer
    queryset = MediaFile.objects.all()


class TrackDocumentView(DocumentViewSet):
    document = TrackDocument
    serializer_class = TrackSerializer
    lookup_field = 'sha1hash'
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        # DefaultOrderingFilterBackend,  # this was in the example
        SearchFilterBackend,
    ]

    search_fields = (
        'artist',
        'album',
        'title',
    )

    filter_fields = {
        'sha1hash': None,
        'artist': 'artist.raw',
        'album': 'album.raw',
        'title': 'title.raw',
    }

    ordering_fields = {
        'artist': None,
        'album': None,
        'title': None,
    }

    ordering = ('artist', 'album', 'title',)  # sort by disc,track
