# Generated by Django 5.1.3 on 2024-11-23 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile', '0009_alter_ownerprofile_phone_number_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ownerprofile',
            name='name',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='name',
        ),
        migrations.AddField(
            model_name='ownerprofile',
            name='username',
            field=models.CharField(max_length=15, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='username',
            field=models.CharField(max_length=15, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='ownerprofile',
            name='email',
            field=models.EmailField(default='default@example.com', max_length=254),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='email',
            field=models.EmailField(default='default@example.com', max_length=254),
        ),
    ]