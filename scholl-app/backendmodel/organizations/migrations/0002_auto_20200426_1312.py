# Generated by Django 2.2.4 on 2020-04-26 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tersangka',
            name='jenis_kelamin',
            field=models.CharField(blank=True, choices=[('laki-laki', 'laki-laki'), ('perempuan', 'perempuan')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='tersangka',
            name='nama_tersangka',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
