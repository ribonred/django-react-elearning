# Generated by Django 2.2.10 on 2020-08-15 22:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notify', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notificationslkn',
            name='topic_fcm',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
