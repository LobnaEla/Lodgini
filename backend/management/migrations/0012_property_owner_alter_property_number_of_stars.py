# Generated by Django 5.1.3 on 2024-11-30 19:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0011_alter_property_number_of_stars'),
        ('profile', '0014_rename_username_userprofile_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='owner',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='properties', to='profile.ownerprofile'),
        ),
        migrations.AlterField(
            model_name='property',
            name='number_of_stars',
            field=models.PositiveIntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)], default=3),
        ),
    ]
