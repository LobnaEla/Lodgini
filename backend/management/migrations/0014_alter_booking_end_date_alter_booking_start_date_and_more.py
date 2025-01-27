# Generated by Django 5.1.3 on 2024-12-10 23:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0013_merge_20241210_2346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='end_date',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='booking',
            name='start_date',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='property',
            name='furnishing_type',
            field=models.CharField(choices=[('Luxuriously Furnished', 'Luxuriously Furnished'), ('Modestly Furnished', 'Modestly Furnished')], max_length=50),
        ),
        migrations.AlterField(
            model_name='property',
            name='property_type',
            field=models.CharField(choices=[('Apartment', 'Apartment'), ('Vacation House', 'Vacation House')], max_length=50),
        ),
    ]
