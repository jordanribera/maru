import hashlib
import mimetypes
from celery import shared_task

from library.models import MediaFile

BUFFER_SIZE = 65536


@shared_task
def import_file(file_path):
    print('importing {}'.format(file_path))

    sha1 = hashlib.sha1()
    with open(file_path, 'rb') as f:
        while True:
            data = f.read(BUFFER_SIZE)
            if not data:
                break
            sha1.update(data)

    MediaFile.objects.update_or_create(
        sha1hash=sha1.hexdigest(),
        defaults={
            'path': file_path,
            'content_type': mimetypes.guess_type(file_path)[0],
        }
    )
