# Generated by Django 3.0.4 on 2020-04-12 12:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0007_auto_20200412_1257'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tersangka',
            old_name='no_penangkapan',
            new_name='no_penangkapan_id',
        ),
    ]
