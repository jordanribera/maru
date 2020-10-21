from rest_framework import serializers
from library.models import MediaFile


class MediaFileSerializer(serializers.ModelSerializer):
    path = serializers.SerializerMethodField()
    raw_path = serializers.SerializerMethodField()

    class Meta:
        model = MediaFile
        fields = ("path", "raw_path", "md5hash", "sha1hash", "content_type",)

    def get_path(self, media_file):
        return '/media/{}'.format(media_file.sha1hash)

    def get_raw_path(self, media_file):
        return media_file.path
