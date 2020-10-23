from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl import fields
from django_elasticsearch_dsl.registries import registry
from library.models import MediaFile


@registry.register_document
class TrackDocument(Document):
    url = fields.TextField(attr='url')
    artist = fields.KeywordField(attr='artist')
    album = fields.KeywordField(attr='album')
    title = fields.KeywordField(attr='title')
    tracknumber = fields.IntegerField(attr='tracknumber')
    tracktotal = fields.IntegerField(attr='tracktotal')
    discnumber = fields.IntegerField(attr='discnumber')
    disctotal = fields.IntegerField(attr='disctotal')
    # problems = fields.ListField(attr='problems')

    class Index:
        name = 'tracks'

    class Django:
        model = MediaFile

        fields = [
            'sha1hash',
            'content_type',
        ]
