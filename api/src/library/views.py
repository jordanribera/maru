from django.db.models import Prefetch
from rest_framework.views import APIView
from rest_framework.response import Response

from library.serializers import MediaFileSerializer
from library.models import MediaFile
from library.models import Artist
from library.models import Album
from library.models import Track
from library.models import Playlist
from library.serializers import ArtistSerializer
from library.serializers import AlbumSerializer
from library.serializers import TrackSerializer
from library.serializers import PlaylistSerializer

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

        artists = self.request.query_params.getlist('artist')
        if len(artists) > 0:
            queryset = queryset.filter(artist__slug__in=artists)

        albums = self.request.query_params.getlist('album')
        if len(albums) > 0:
            queryset = queryset.filter(album__slug__in=albums)

        return queryset


class PlaylistView(ReadOnlyModelViewSet):
    serializer_class = PlaylistSerializer

    def get_queryset(self):
        queryset = Playlist.objects.prefetch_related(
            Prefetch(
                'items',
                Track.objects.order_by('playlists__position'),
            )
        )
        return queryset


class InfoView(APIView):
    def get(self, request, format=None):
        artists = Artist.objects.all()
        albums = Album.objects.all()

        return Response({
            'counts': {
                'artist': artists.count(),
                'album': albums.count(),
                'song': Track.objects.count(),
            },
            'filter_options': {
                'artist': [
                    {'key': artist.slug, 'label': artist.name}
                    for artist in artists
                ],
                'album': [
                    {'key': album.slug, 'label': album.name}
                    for album in albums
                ],
            },
        })
