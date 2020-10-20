from rest_framework.generics import ListAPIView
from library.serializers import MediaFileSerializer
from library.models import MediaFile


class MediaFileListAPIView(ListAPIView):
    serializer_class = MediaFileSerializer

    def get_queryset(self):
        return MediaFile.objects.all()
