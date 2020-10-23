from rest_framework import serializers
from library.models import MediaFile
from library.documents import TrackDocument

from django_elasticsearch_dsl_drf.serializers import DocumentSerializer


class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = ('path', 'url', 'md5hash', 'sha1hash', 'content_type',)


class TrackSerializer(DocumentSerializer):
    track = serializers.SerializerMethodField()
    disc = serializers.SerializerMethodField()

    class Meta:
        document = TrackDocument
        fields = (
            'sha1hash',
            'url',
            'content_type',
            'artist',
            'album',
            'title',
        )

    def get_track(self, obj):
        return {
            'number': obj.tracknumber,
            'total': obj.tracktotal,
        }

    def get_disc(self, obj):
        return {
            'number': obj.discnumber,
            'total': obj.disctotal,
        }
