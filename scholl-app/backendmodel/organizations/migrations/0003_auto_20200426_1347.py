# Generated by Django 2.2.4 on 2020-04-26 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0002_auto_20200426_1312'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tersangka',
            name='jenis_kelamin',
            field=models.CharField(choices=[('laki-laki', 'laki-laki'), ('perempuan', 'perempuan')], default=1, max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tersangka',
            name='nama_tersangka',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]