import os
from django.http import StreamingHttpResponse
from django.views import View
from wsgiref.util import FileWrapper

from library.models import MediaFile


CHUNK_SIZE = 8192


class FileMaskView(View):
    def get(self, request, *args, **kwargs):
        media_file = MediaFile.objects.get(sha1hash=kwargs['hash'])
        mask = '{}.flac'.format(kwargs['hash'])  # don't assume extension

        output = StreamingHttpResponse(
            FileWrapper(open(media_file.path, 'rb'), CHUNK_SIZE),
            content_type=media_file.content_type,
        )
        output['Content-Length'] = os.path.getsize(media_file.path)
        output['Content-Disposition'] = 'attachment; filename={}'.format(mask)
        return output
