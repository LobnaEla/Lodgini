# Generated by Django 5.1.3 on 2024-11-30 19:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0009_alter_property_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='owner',
        ),
    ]