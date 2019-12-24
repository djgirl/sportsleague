from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=250)
    logo = models.ImageField(upload_to='teams/', blank=True, null=True)
    club_state = models.CharField(null=True, max_length=250)

    def __unicode__(self):
        return u'%s' % self.pk

    def __str__(self):
        return self.name

class Player(models.Model):
    team = models.ForeignKey(
        Team, on_delete=models.CASCADE, related_name='players')
    first_name = models.CharField(null=True, max_length=250)
    last_name = models.CharField(null=True, max_length=250)
    profile_pic = models.ImageField(blank=True, null=True)
    jersey_number = models.IntegerField(default=0)
    country = models.CharField(null=True, max_length=250)


    def __unicode__(self):
        return u'%s' % self.pk

    def __str__(self):
        return self.first_name + ' ' + self.last_name

class Match(models.Model):
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team1")
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="team2")
    winner = models.ForeignKey(
        Team, on_delete=models.CASCADE, related_name='winning_matches')
    points = models.IntegerField(default=0)
    start_at = models.DateTimeField()
    team1_score = models.IntegerField(default=0)
    team2_score = models.IntegerField(default=0)

    def __unicode__(self):
        return u'%s' % self.pk

    def __str__(self):
        return self.team1.name + ' ' + self.team2.name


class PointsTable(models.Model):
    team = models.OneToOneField(Team, related_name='points_table', on_delete=models.CASCADE)
    played = models.IntegerField(default=0)
    won = models.IntegerField(default=0)
    lost = models.IntegerField(default=0)
    total_points = models.IntegerField(default=0)

    def __str__(self):
        return self.team.name
