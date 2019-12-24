from django.shortcuts import render
import string
import random
import json
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_201_CREATED
)
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.db.models import Sum
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import get_template
from django.template import loader, Context
from datetime import datetime
from django.shortcuts import get_object_or_404, render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Create your views here.

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def team_list(request):
    team_list = Team.objects.all()
    paginator = Paginator(team_list, 20)
    print(request.data)

    page = request.data.get('page', 1)
    try:
        team_list = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        team_list = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999),
        # deliver last page of results.
        team_list = paginator.page(paginator.num_pages)

    serializer = TeamSerializer(team_list, many=True)
    return Response({"team_list": serializer.data, "error": False},
                    status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def player_list(request):
    player_list = Player.objects.all()
    paginator = Paginator(player_list, 15)

    page = request.data.get('page', 1)
    try:
        player_list = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        player_list = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999),
        # deliver last page of results.
        player_list = paginator.page(paginator.num_pages)

    serializer = PlayerSerializer(player_list, many=True)
    return Response({"player_list": serializer.data, "error": False},
                    status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def match_list(request):
    match_list = Match.objects.all()
    paginator = Paginator(match_list, 15)

    page = request.data.get('page', 1)
    try:
        match_list = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        match_list = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999),
        # deliver last page of results.
        match_list = paginator.page(paginator.num_pages)

    serializer = MatchSerializer(match_list, many=True)
    return Response({"match_list": serializer.data, "error": False},
                    status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def points_table_list(request):
    points_table_list = PointsTable.objects.all()
    paginator = Paginator(points_table_list, 15)

    page = request.data.get('page', 1)
    try:
        points_table_list = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        points_table_list = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999),
        # deliver last page of results.
        points_table_list = paginator.page(paginator.num_pages)

    serializer = PointsTableSerializer(points_table_list, many=True)
    return Response({"points_table_list": serializer.data, "error": False},
                    status=HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_team(request):
    print(request.data)
    validate_team = TeamSerializer(data=request.POST)
    print(validate_team.is_valid(), request.POST, request.FILES)
    if validate_team.is_valid():
        team = validate_team.save()
        print(team)
        data = {'error': False}
    else:
        print(validate_team.is_valid())
        data = {'error': True, 'errors': validate_team.errors}
    return Response(data, status=HTTP_200_OK)



@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def edit_team(request, pk):
    team = get_object_or_404(Team, pk=pk)
    validate_team = TeamSerializer(data=request.POST, instance=team)
    if validate_team.is_valid():
        team = validate_team.save()
        data = {'error': False}
    else:
        print(validate_team.is_valid())
        data = {'error': True, 'errors': validate_team.errors}
    return Response(data, status=HTTP_200_OK)



@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def view_team(request, pk):
    team = get_object_or_404(Team, pk=pk)

    if request.method == "POST":
        team.delete()
        return Response({'message': 'deleted'}, status=HTTP_200_OK)
    team = TeamSerializer(instance=team)
    return Response({'team': team.data}, status=HTTP_200_OK)
