from django.urls import path
from . import views

app_name = 'jobs'

urlpatterns = [
    path('', views.JobListView.as_view(), name='home'),
    path('create/', views.JobCreateView.as_view(), name='create'), 
    path('<int:pk>/', views.JobDetailView.as_view(), name='detail'),  
    path('update/<int:pk>/', views.JobUpdateView.as_view(), name='update'),
    path('api/jobs/', views.jobData, name='getJobs'), 
    path('api/jobs/<int:pk>/', views.jobActions, name='jobsActions'), 
]
