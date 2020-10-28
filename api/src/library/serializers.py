from rest_framework import serializers
from library.models import MediaFile
from library.models import Artist
from library.models import Album
from library.models import Track


class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = ('path', 'url', 'sha1hash', 'content_type',)


class ArtistSerializer(serializers.ModelSerializer):
    albums = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name',
    )

    class Meta:
        model = Artist
        fields = ('name', 'albums',)


class AlbumSerializer(serializers.ModelSerializer):
    artist = serializers.SlugRelatedField(slug_field='name', read_only=True)
    tracks = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='title',
    )

    class Meta:
        model = Album
        fields = ('name', 'artist', 'year', 'tracks',)


class TrackSerializer(serializers.ModelSerializer):
    artist = serializers.SlugRelatedField(slug_field='name', read_only=True)
    album = serializers.SlugRelatedField(slug_field='name', read_only=True)
    year = serializers.IntegerField(source='album.year')
    track = serializers.SerializerMethodField()
    disc = serializers.SerializerMethodField()

    # revamp this to support multiple file sources per track
    sha1hash = serializers.CharField(source='media_file.sha1hash')
    url = serializers.CharField(source='media_file.url')
    artwork_url = serializers.SerializerMethodField()
    content_type = serializers.CharField(source='media_file.content_type')

    class Meta:
        model = Track
        fields = (
            'artist',
            'album',
            'title',
            'year',
            'track',
            'disc',
            'genre',
            'sha1hash',
            'url',
            'artwork_url',
            'content_type',
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

    def get_artwork_url(self, obj):
        if obj.album.artwork:
            return obj.album.artwork.url
