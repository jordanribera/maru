from rest_framework import serializers
from library.models import MediaFile


class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = ("path", "url", "md5hash", "sha1hash", "content_type",)
