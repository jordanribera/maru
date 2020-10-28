import os
from django.http import StreamingHttpResponse
from django.views import View
from wsgiref.util import FileWrapper

from library.models import MediaFile


CHUNK_SIZE = 8192


class FileMaskView(View):
    file_model = MediaFile

    def __init__(self, *args, file_model=MediaFile, **kwargs):
        super(FileMaskView, self).__init__(**kwargs)
        self.file_model = file_model

    def get(self, request, *args, **kwargs):
        file = self.file_model.objects.get(sha1hash=kwargs['hash'])
        mask = '{file_hash}{extension}'.format(
            file_hash=kwargs['hash'],
            extension=file.extension,
        )

        output = StreamingHttpResponse(
            FileWrapper(open(file.path, 'rb'), CHUNK_SIZE),
            content_type=file.content_type,
        )
        output['Content-Length'] = os.path.getsize(file.path)

        # playback works fine without the disposition. remove?
        output['Content-Disposition'] = 'attachment; filename={}'.format(mask)
        return output
