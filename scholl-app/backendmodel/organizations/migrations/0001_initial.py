# Generated by Django 3.0.4 on 2020-04-13 12:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BarangBukti',
            fields=[
                ('basetimestampmodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.BaseTimeStampModel')),
                ('nama_barang', models.CharField(blank=True, max_length=255, null=True)),
                ('sp_sita', models.CharField(blank=True, max_length=255, null=True)),
                ('tap_status', models.CharField(blank=True, max_length=255, null=True)),
                ('jenis_barang', models.CharField(blank=True, choices=[('narkotika', 'narkotika'), ('non narkotika', 'non narkotika')], max_length=255, null=True)),
            ],
            bases=('core.basetimestampmodel',),
        ),
        migrations.CreateModel(
            name='BerkasLKN',
            fields=[
                ('basetimestampmodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.BaseTimeStampModel')),
                ('LKN', models.CharField(max_length=80, unique=True)),
                ('tgl_dibuat', models.DateField(blank=True, null=True)),
                ('penyidik', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='peyidik_lkn', to=settings.AUTH_USER_MODEL)),
            ],
            bases=('core.basetimestampmodel',),
        ),
        migrations.CreateModel(
            name='Penangkapan',
            fields=[
                ('basetimestampmodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.BaseTimeStampModel')),
                ('no_penangkapan', models.CharField(max_length=255, unique=True)),
                ('tanggal_penangkapan', models.DateField(blank=True, null=True)),
                ('jam_penangkapan', models.TimeField(blank=True, null=True)),
                ('no_lkn', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='penangkapan', to='organizations.BerkasLKN')),
            ],
            bases=('core.basetimestampmodel',),
        ),
        migrations.CreateModel(
            name='ProsesPengadilan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama_proses', models.CharField(max_length=125)),
            ],
        ),
        migrations.CreateModel(
            name='Tersangka',
            fields=[
                ('basetimestampmodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.BaseTimeStampModel')),
                ('nama_tersangka', models.CharField(max_length=255)),
                ('umur', models.SmallIntegerField(blank=True, null=True)),
                ('jenis_kelamin', models.CharField(choices=[('laki-laki', 'laki-laki'), ('perempuan', 'perempuan')], max_length=20)),
                ('foto', models.ImageField(blank=True, null=True, upload_to='media')),
                ('no_penangkapan_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='penangkapan_tersangka', to='organizations.Penangkapan')),
            ],
            bases=('core.basetimestampmodel',),
        ),
        migrations.CreateModel(
            name='StatusTersangka',
            fields=[
                ('basetimestampmodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.BaseTimeStampModel')),
                ('status_penahanan', models.CharField(blank=True, choices=[('Di tahan', 'Di tahan'), ('Di Amankan', 'Di Amankan')], max_length=125, null=True)),
                ('rekam_jejak', models.CharField(blank=True, choices=[('Keluar', 'Keluar'), ('Masuk', 'Masuk')], max_length=125, null=True)),
                ('tanggal', models.DateField(blank=True, null=True)),
                ('waktu', models.TimeField(blank=True, null=True)),
                ('keterangan', models.TextField(blank=True, null=True)),
                ('tersangka_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='statustersangka', to='organizations.Tersangka')),
            ],
            bases=('core.basetimestampmodel',),
        ),
        migrations.CreateModel(
            name='StatusBarangBukti',
            fields=[
                ('basetimestampmodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.BaseTimeStampModel')),
                ('tanggal_status', models.DateField(blank=True, null=True)),
                ('waktu_status', models.TimeField(blank=True, null=True)),
                ('jumlah', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('keterangan', models.TextField(blank=True, null=True)),
                ('status', models.CharField(blank=True, choices=[('Keluar', 'Keluar'), ('Masuk', 'Masuk')], max_length=20, null=True)),
                ('barang_bukti_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='statusbarangbukti', to='organizations.BarangBukti')),
            ],
            bases=('core.basetimestampmodel',),
        ),
        migrations.CreateModel(
            name='ProsesTersangka',
            fields=[
                ('basetimestampmodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.BaseTimeStampModel')),
                ('no_proses', models.CharField(max_length=255)),
                ('keterangan', models.CharField(max_length=255)),
                ('jenis_proses', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='proses_pengadilan', to='organizations.ProsesPengadilan')),
                ('proses_tersangka', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='prosestersangka', to='organizations.Tersangka')),
            ],
            bases=('core.basetimestampmodel',),
        ),
        migrations.AddField(
            model_name='barangbukti',
            name='milik_tersangka_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='barangbuktitersangka', to='organizations.Tersangka'),
        ),
    ]
