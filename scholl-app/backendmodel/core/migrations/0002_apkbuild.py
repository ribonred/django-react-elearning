# Generated by Django 2.2.10 on 2020-08-17 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApkBuild',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version', models.CharField(blank=True, max_length=255, null=True)),
                ('file_apk', models.FileField(upload_to='apk/')),
            ],
        ),
    ]
