# flake8: noqa
# Generated by Django 3.1.2 on 2020-11-09 23:00

from django.db import migrations
import django.db.models.functions.text


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0020_auto_20201107_2040'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='album',
            options={'ordering': (django.db.models.functions.text.Lower('artist__name'), 'year', django.db.models.functions.text.Lower('name'))},
        ),
        migrations.AlterModelOptions(
            name='artist',
            options={'ordering': (django.db.models.functions.text.Lower('name'),)},
        ),
        migrations.AlterModelOptions(
            name='track',
            options={'ordering': (django.db.models.functions.text.Lower('artist__name'), 'album__year', django.db.models.functions.text.Lower('album__name'), 'discnumber', 'tracknumber')},
        ),
    ]