from django.urls import path
from . import views

urlpatterns = [
    path('', views.jobList, name='jobList'), 
    path('jobs/', views.jobData, name='getJobs'), 
    path('jobs/<int:pk>/', views.jobActions, name='jobsActions'), 
]
