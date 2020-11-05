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


class TrackSerializer(serializers.ModelSerializer):
    artist = serializers.SlugRelatedField(slug_field='name', read_only=True)
    album = serializers.SlugRelatedField(slug_field='name', read_only=True)
    year = serializers.IntegerField(source='album.year')
    length = serializers.DecimalField(
        source='media_file.length',
        max_digits=6,
        decimal_places=2,
    )
    track = serializers.SerializerMethodField()
    disc = serializers.SerializerMethodField()

    # revamp this to support multiple file sources per track
    sha1hash = serializers.CharField(source='media_file.sha1hash')
    url = serializers.CharField(source='media_file.url')
    artwork = serializers.SerializerMethodField()
    content_type = serializers.CharField(source='media_file.content_type')

    class Meta:
        model = Track
        fields = (
            'artist',
            'album',
            'title',
            'year',
            'length',
            'track',
            'disc',
            'genre',
            'sha1hash',
            'url',
            'artwork',
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

    def get_artwork(self, obj):
        if obj.album.cover:
            return obj.album.cover.url


class AlbumSerializer(serializers.ModelSerializer):
    artist = serializers.SlugRelatedField(slug_field='name', read_only=True)
    # TODO: when playlist hash set loading works, replace tracks with hashes
    tracks = TrackSerializer(
        many=True,
        read_only=True,
    )
    cover = serializers.SerializerMethodField()
    artwork = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = ('name', 'artist', 'year', 'tracks', 'cover', 'artwork',)

    def get_cover(self, obj):
        if obj.cover:
            return obj.cover.url

    def get_artwork(self, obj):
        return [
            a.artwork.url
            for a in obj.artwork.filter(rel='folder_cover').all()
        ]


class PlaylistSerializer(serializers.ModelSerializer):
    # TODO: when playlist hash set loading works, replace tracks with hashes
    items = TrackSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Album
        fields = ('name', 'items',)
