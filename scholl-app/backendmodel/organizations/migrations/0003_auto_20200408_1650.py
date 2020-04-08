# Generated by Django 3.0.4 on 2020-04-08 16:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20200405_0627'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('organizations', '0002_auto_20200408_1558'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='company_division',
        ),
        migrations.RemoveField(
            model_name='companydivision',
            name='division_member',
        ),
        migrations.AddField(
            model_name='companydivision',
            name='company_division',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='division', to='organizations.Company'),
        ),
        migrations.CreateModel(
            name='DivisionMember',
            fields=[
                ('basetimestampmodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.BaseTimeStampModel')),
                ('division', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='company_member_division', to='organizations.CompanyDivision')),
                ('division_member', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='member', to=settings.AUTH_USER_MODEL)),
            ],
            bases=('core.basetimestampmodel',),
        ),
    ]
