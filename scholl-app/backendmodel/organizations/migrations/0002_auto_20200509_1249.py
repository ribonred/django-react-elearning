# Generated by Django 2.2.10 on 2020-05-09 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prosestersangka',
            name='keterangan',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]