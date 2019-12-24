from rest_framework import serializers
from .models import *


class TeamSerializer(serializers.ModelSerializer):


    class Meta:
        model = Team
        fields = ['id', 'name', 'logo', 'club_state']


class PlayerSerializer(serializers.ModelSerializer):
    team = TeamSerializer()

    class Meta:
        model = Player
        fields = ['id', 'first_name', 'last_name', 'profile_pic', 'team', 'jersey_number', 'country']


class MatchSerializer(serializers.ModelSerializer):
    team1 = TeamSerializer()
    team2 = TeamSerializer()
    winner = TeamSerializer()
    started_on = serializers.SerializerMethodField()
    
    class Meta:
        model = Match
        fields = ['id', 'points', 'start_at', 'started_on', 'team1', 'team2', 'winner', 'team1_score', 'team2_score']

    def get_started_on(self, obj):
        return obj.start_at.strftime('%b %d, %Y')


class PointsTableSerializer(serializers.ModelSerializer):
    team = TeamSerializer()

    class Meta:
        model = PointsTable
        fields = ['id', 'won', 'lost', 'total_points', 'team', 'played']



