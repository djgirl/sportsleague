# Generated by Django 3.0.1 on 2019-12-20 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('league', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='points',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='team',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='teams/'),
        ),
    ]
