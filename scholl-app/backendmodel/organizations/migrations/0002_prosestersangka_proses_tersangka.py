# Generated by Django 3.0.4 on 2020-04-10 17:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='prosestersangka',
            name='proses_tersangka',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='organizations.Tersangka'),
            preserve_default=False,
        ),
    ]
