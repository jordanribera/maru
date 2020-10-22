from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl import fields
from django_elasticsearch_dsl.registries import registry
from library.models import MediaFile


@registry.register_document
class TrackDocument(Document):
    url = fields.TextField(attr='url')
    artist = fields.TextField(attr='artist')
    album = fields.TextField(attr='album')
    title = fields.TextField(attr='title')

    class Index:
        name = 'tracks'

    class Django:
        model = MediaFile

        fields = [
            'sha1hash',
            'content_type',
        ]
