from rest_framework import serializers
from library.models import MediaFile
from library.documents import TrackDocument

from django_elasticsearch_dsl_drf.serializers import DocumentSerializer


class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = ('path', 'url', 'md5hash', 'sha1hash', 'content_type',)


class TrackSerializer(DocumentSerializer):
    class Meta:
        document = TrackDocument
        fields = ('sha1hash', 'url', 'artist', 'album', 'title',)
