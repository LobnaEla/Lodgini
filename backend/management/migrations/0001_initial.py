# Generated by Django 5.1.3 on 2024-12-02 10:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profile', '0014_rename_username_userprofile_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('property_type', models.CharField(choices=[('Apartment', 'Apartment'), ('Vacation House', 'Vacation House')], max_length=50)),
                ('furnishing_type', models.CharField(choices=[('Luxuriously Furnished', 'Luxuriously Furnished'), ('Modestly Furnished', 'Modestly Furnished')], max_length=50)),
                ('location', models.CharField(max_length=255)),
                ('price_per_night', models.DecimalField(decimal_places=2, max_digits=10)),
                ('number_of_stars', models.PositiveIntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)], default=3)),
                ('number_of_bedrooms', models.PositiveIntegerField()),
                ('number_of_living_rooms', models.PositiveIntegerField()),
                ('number_of_bathrooms', models.PositiveIntegerField()),
                ('number_of_dining_rooms', models.PositiveIntegerField()),
                ('max_number_guests', models.PositiveIntegerField(default=4)),
                ('wifi_speed', models.CharField(blank=True, max_length=100, null=True)),
                ('number_of_refrigerators', models.PositiveIntegerField()),
                ('number_of_tvs', models.PositiveIntegerField()),
                ('owner', models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='properties', to='profile.ownerprofile')),
            ],
            options={
                'verbose_name': 'Property',
                'verbose_name_plural': 'Properties',
            },
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(choices=[('Confirmed', 'Confirmed'), ('Cancelled', 'Cancelled')], default='Confirmed', max_length=20)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookings', to='profile.userprofile')),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.property')),
            ],
        ),
        migrations.CreateModel(
            name='PropertyUnavailableDate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='management.property')),
            ],
        ),
    ]
