from django.conf.urls import url
from django.conf.urls import include

from library.views import ArtistView
from library.views import AlbumView
from library.views import TrackView
from library.views import MediaFileView
from library.views import TrackDocumentView
from rest_framework.routers import DefaultRouter

search_router = DefaultRouter()
search = search_router.register(
    r'search',
    TrackDocumentView,
    basename='search',
)
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


urlpatterns = [
    url(r'^', include(search_router.urls)),
]
