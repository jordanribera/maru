# flake8: noqa
# Generated by Django 3.1.2 on 2020-10-31 22:10

import autoslug.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0011_playlists'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='slug',
            field=autoslug.fields.AutoSlugField(editable=False, populate_from='name'),
        ),
        migrations.AddField(
            model_name='artist',
            name='slug',
            field=autoslug.fields.AutoSlugField(editable=False, populate_from='name'),
        ),
    ]
