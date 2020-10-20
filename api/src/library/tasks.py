import hashlib
from celery import shared_task

from library.models import MediaFile

BUFFER_SIZE = 65536


@shared_task
def import_file(file_path):
    print('importing {}'.format(file_path))

    sha1 = hashlib.sha1()
    md5 = hashlib.md5()
    with open(file_path, 'rb') as f:
        while True:
            data = f.read(BUFFER_SIZE)
            if not data:
                break
            sha1.update(data)
            md5.update(data)

    MediaFile.objects.create(
        path=file_path,
        md5hash=md5.hexdigest(),
        sha1hash=sha1.hexdigest(),
    )
