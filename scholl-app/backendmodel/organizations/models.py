from django.db import models
from backendmodel.core.models import BaseTimeStampModel, User
import uuid


class BerkasLKN(BaseTimeStampModel):
    LKN = models.CharField(max_length=80, unique=True)
    penyidik = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name='peyidik_lkn', null=True, blank=True)
    tgl_dibuat = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.LKN


class Penangkapan(BaseTimeStampModel):
    no_lkn = models.ForeignKey(
        BerkasLKN, null=True, blank=True, related_name='penangkapan', on_delete=models.CASCADE)
    no_penangkapan = models.CharField(max_length=255,unique=True)
    tanggal_penangkapan = models.DateField(
        null=True, blank=True)
    jam_penangkapan = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f'/ {self.no_penangkapan}'


class Tersangka(BaseTimeStampModel):
    L = 'laki-laki'
    P = 'perempuan'
    sex = (
        (L, 'laki-laki'),
        (P, 'perempuan')
    )
    no_penangkapan_id = models.ForeignKey(
        Penangkapan, related_name='penangkapan_tersangka', on_delete=models.CASCADE)
    nama_tersangka = models.CharField(max_length=255)
    umur = models.SmallIntegerField(blank=True, null=True)
    jenis_kelamin = models.CharField(max_length=20, choices=sex)
    foto = models.ImageField(null=True, blank=True, upload_to='media')

    def __str__(self):
        return f'{self.nama_tersangka} / {self.no_penangkapan_id.no_penangkapan}'


class StatusTersangka(BaseTimeStampModel):
    T = 'Di tahan'
    A = 'Di Amankan'
    status = (
        (T, 'Di tahan'),
        (A, 'Di Amankan')
    )
    K = 'Keluar'
    M = 'Masuk'
    status2 = (
        (K, 'Keluar'),
        (M, 'Masuk')
    )
    tersangka_id = models.ForeignKey(
        Tersangka, on_delete=models.SET_NULL, null=True, blank=True, related_name='statustersangka')
    status_penahanan = models.CharField(
        max_length=125, choices=status, blank=True, null=True)
    rekam_jejak = models.CharField(
        max_length=125, choices=status2, blank=True, null=True)
    tanggal = models.DateField(null=True, blank=True)
    waktu = models.TimeField(null=True, blank=True)
    keterangan = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'|| status: {self.status_penahanan} || rekam: {self.rekam_jejak}'


class ProsesPengadilan(models.Model):
    nama_proses = models.CharField(max_length=125)

    def __str__(self):
        return self.nama_proses


class ProsesTersangka(BaseTimeStampModel):
    proses_tersangka = models.ForeignKey(
        Tersangka, on_delete=models.CASCADE, related_name='prosestersangka')
    no_proses = models.CharField(max_length=255)
    jenis_proses = models.ForeignKey(
        ProsesPengadilan, on_delete=models.CASCADE, related_name='proses_pengadilan')
    keterangan = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.proses_tersangka.nama_tersangka}||{self.no_proses} || {self.jenis_proses.nama_proses}'


class BarangBukti(BaseTimeStampModel):
    NARKOTIK = 'narkotika'
    NON_NARKOTIK = 'non narkotika'
    jenis = (
        (NARKOTIK, 'narkotika'),
        (NON_NARKOTIK, 'non narkotika')
    )
    milik_tersangka_id = models.ForeignKey(
        Tersangka, on_delete=models.CASCADE, related_name='barangbuktitersangka', blank=True, null=True)
    nama_barang = models.CharField(max_length=255, blank=True, null=True)
    sp_sita = models.CharField(max_length=255, blank=True, null=True)
    tap_status = models.CharField(max_length=255, blank=True, null=True)
    jenis_barang = models.CharField(
        max_length=255, choices=jenis, blank=True, null=True)

    def __str__(self):
        return f'{self.milik_tersangka_id.nama_tersangka} || {self.nama_barang} || {self.jenis_barang}'


class StatusBarangBukti(BaseTimeStampModel):
    K = 'Keluar'
    M = 'Masuk'
    status_bb = (
        (K, 'Keluar'),
        (M, 'Masuk')
    )
    barang_bukti_id = models.ForeignKey(
        BarangBukti, on_delete=models.CASCADE, related_name='statusbarangbukti')
    tanggal_status = models.DateField(null=True, blank=True)
    waktu_status = models.TimeField(null=True, blank=True)
    jumlah = models.DecimalField(
        decimal_places=2, null=True, blank=True, max_digits=5)
    keterangan = models.TextField(null=True, blank=True)
    status = models.CharField(
        max_length=20, blank=True, null=True, choices=status_bb)

    def __str__(self):
        return f'{self.barang_bukti_id.milik_tersangka_id.nama_tersangka} || {self.barang_bukti_id.nama_barang} || {self.jumlah} || {self.status}'
