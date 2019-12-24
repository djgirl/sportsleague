from django.urls import path
from .views import *

app_name = "api"

urlpatterns = [
    # path('login/', login, name="login"),

    path('team/list/', team_list, name='team_list'),
    path('team/view/<int:pk>/', view_team, name='view_team'),
    path('team/add/', add_team, name='add_team'),
    path('team/edit/<int:pk>/', edit_team, name='edit_team'),

    path('players/list/', player_list, name='player_list'),
    path('match/list/', match_list, name='match_list'),
    path('points-table/list/', points_table_list, name='points_table_list'),


    # path('report-segments/view/<int:pk>/', view_report_segment, name='view_report_segment'),
    # path('report-segments/add/', add_report_segments, name='add_report_segments'),
    # path('report-segments/edit/<int:pk>/', edit_report_segments, name='edit_report_segments'),

]
