# Generated by Django 3.0.4 on 2020-04-12 12:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0005_auto_20200412_1120'),
    ]

    operations = [
        migrations.AlterField(
            model_name='barangbukti',
            name='milik_tersangka',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='barangbuktitersangka', to='organizations.Tersangka'),
        ),
        migrations.AlterField(
            model_name='penangkapan',
            name='no_lkn',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='penangkapan', to='organizations.BerkasLKN'),
        ),
        migrations.AlterField(
            model_name='statusbarangbukti',
            name='barang_bukti',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='statusbarangbukti', to='organizations.BarangBukti'),
        ),
        migrations.AlterField(
            model_name='tersangka',
            name='no_penangkapan',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='penangkapan_tersangka', to='organizations.Penangkapan'),
        ),
    ]
