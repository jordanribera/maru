# Generated by Django 3.1.2 on 2020-10-26 01:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0005_metadata_tables'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='discnumber',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='track',
            name='disctotal',
            field=models.IntegerField(default=1),
        ),
    ]
