import os
from django.http import StreamingHttpResponse
from django.views import View
from wsgiref.util import FileWrapper

from library.models import MediaFile


CHUNK_SIZE = 8192


class FileMaskView(View):
    def get(self, request, *args, **kwargs):
        media_file = MediaFile.objects.get(sha1hash=kwargs['hash'])
        filename = '{}.flac'.format(kwargs['hash'])

        response = StreamingHttpResponse(
            FileWrapper(open(media_file.path, 'rb'), CHUNK_SIZE),
            content_type="audio/x-flac",
        )
        response['Content-Length'] = os.path.getsize(media_file.path)
        response['Content-Disposition'] = 'attachment; filename={}'.format(filename)
        return response
