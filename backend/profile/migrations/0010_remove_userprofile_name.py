# Generated by Django 5.1.3 on 2024-11-24 10:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profile', '0009_alter_ownerprofile_phone_number_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='name',
        ),
    ]
