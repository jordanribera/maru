from django.conf.urls import url
from django.conf.urls import include

from library.views import MediaFileView
from library.views import TrackDocumentView
from rest_framework.routers import DefaultRouter

search_router = DefaultRouter()
tracks = search_router.register(r'tracks', TrackDocumentView, basename='tracks')
files = search_router.register(r'files', MediaFileView, basename='files')


urlpatterns = [
    url(r'^', include(search_router.urls)),
]
