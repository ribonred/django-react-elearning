# Generated by Django 2.2.4 on 2020-05-03 17:00

import backendmodel.core.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='BaseTimeStampModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, verbose_name='email address')),
                ('username', models.CharField(max_length=255, unique=True)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('nama_depan', models.CharField(blank=True, max_length=255, null=True)),
                ('nama_belakang', models.CharField(blank=True, max_length=255, null=True)),
                ('tanggal_lahir', models.DateField(blank=True, null=True)),
                ('jenis_kelamin', models.CharField(choices=[('laki-laki', 'laki-laki'), ('perempuan', 'perempuan')], max_length=20)),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to=backendmodel.core.models.usermanagerprofile)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('role', models.PositiveIntegerField(choices=[(1, 'penyidik'), (2, 'manager')], default=3)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
