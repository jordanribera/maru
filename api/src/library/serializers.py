from rest_framework import serializers
from library.models import MediaFile
from library.models import Artist
from library.models import Album
from library.models import Track
from library.documents import TrackDocument

from django_elasticsearch_dsl_drf.serializers import DocumentSerializer


class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = ('path', 'url', 'sha1hash', 'content_type',)


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('name',)


class AlbumSerializer(serializers.ModelSerializer):
    artist = serializers.SlugRelatedField(slug_field='name', read_only=True)
    tracks = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='title',
    )

    class Meta:
        model = Album
        fields = ('name', 'artist', 'tracks',)


class TrackSerializer(serializers.ModelSerializer):
    artist = serializers.SlugRelatedField(slug_field='name', read_only=True)
    album = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Track
        fields = ('artist', 'album', 'title',)


class TrackDocumentSerializer(DocumentSerializer):
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
