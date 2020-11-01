from django.conf.urls import url
from django.conf.urls import include

from library.views import ArtistView
from library.views import AlbumView
from library.views import TrackView
from library.views import PlaylistView
from library.views import MediaFileView
from library.views import InfoView
from rest_framework.routers import DefaultRouter

search_router = DefaultRouter()
files = search_router.register(
    r'files',
    MediaFileView,
    basename='files',
)


artists = search_router.register(
    r'artists',
    ArtistView,
    basename='artists',
)
albums = search_router.register(
    r'albums',
    AlbumView,
    basename='albums',
)
tracks = search_router.register(
    r'tracks',
    TrackView,
    basename='tracks',
)
playlists = search_router.register(
    r'playlists',
    PlaylistView,
    basename='playlists',
)


urlpatterns = [
    url(r'^', include(search_router.urls)),
    url(r'^info', InfoView.as_view(), name='info'),
]
