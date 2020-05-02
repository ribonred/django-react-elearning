from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from .manager import AppUserManager
import uuid
from django.utils import timezone
def usermanagerprofile(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return '{0}_manager_profile_pic/{1}'.format(instance.username, filename)


class BaseTimeStampModel(models.Model):
    created = models.DateTimeField(default=timezone.now,editable=False)
    updated = models.DateTimeField(auto_now_add=True)


class User(AbstractBaseUser, PermissionsMixin):
    L = 'laki-laki'
    P = 'perempuan'
    sex = (
        (L, 'laki-laki'),
        (P, 'perempuan')
    )

    PENYIDIK = 1
    MANAGER = 2
    ROLE_CHOICES = (
        (PENYIDIK, 'penyidik'),
        (MANAGER, 'manager')
    )
    email = models.EmailField(('email address'))
    username = models.CharField(max_length=255, unique=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField(blank=True, null=True)
    nama_depan = models.CharField(max_length=255, null=True, blank=True)
    nama_belakang = models.CharField(max_length=255, null=True, blank=True)
    tanggal_lahir = models.DateField(null=True, blank=True)
    jenis_kelamin = models.CharField(max_length=20, choices=sex)
    profile_pic = models.ImageField(
        upload_to=usermanagerprofile, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    role = models.PositiveIntegerField(choices=ROLE_CHOICES, default=3)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = AppUserManager()

    def fullname(self):
        return f'{self.nama_depan} {self.nama_belakang}'

    def __str__(self):
        return self.email
