# Generated by Django 5.1.3 on 2024-12-03 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile', '0014_rename_username_userprofile_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ownerprofile',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_owner_pics/'),
        ),
    ]
