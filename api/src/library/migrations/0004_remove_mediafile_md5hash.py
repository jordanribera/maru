# Generated by Django 3.1.2 on 2020-10-24 23:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0003_mediafile_content_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mediafile',
            name='md5hash',
        ),
    ]
