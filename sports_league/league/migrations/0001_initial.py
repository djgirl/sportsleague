# Generated by Django 3.0.1 on 2019-12-20 07:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, null=True)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='')),
                ('club_state', models.CharField(max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PointsTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('played', models.IntegerField(default=0)),
                ('won', models.IntegerField(default=0)),
                ('lost', models.IntegerField(default=0)),
                ('total_points', models.IntegerField(default=0)),
                ('team', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='points_table', to='league.Team')),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=250, null=True)),
                ('last_name', models.CharField(max_length=250, null=True)),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='')),
                ('jersey_number', models.IntegerField(default=0)),
                ('country', models.CharField(max_length=250, null=True)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='players', to='league.Team')),
            ],
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('points', models.IntegerField(default=2)),
                ('start_at', models.DateTimeField()),
                ('team1_score', models.IntegerField(default=0)),
                ('team2_score', models.IntegerField(default=0)),
                ('team1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='team1', to='league.Team')),
                ('team2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='team2', to='league.Team')),
                ('winner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='winning_matches', to='league.Team')),
            ],
        ),
    ]