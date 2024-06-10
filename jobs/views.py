from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Job
from .serializers import JobSerializer

#Classes for Views 
class JobListView(ListView):
    model = Job
    template_name = 'jobs/home.html'

class JobDetailView(DetailView):
    model = Job
    template_name = 'jobs/detail.html'
    context_object_name = 'job'

class JobCreateView(CreateView):
    model = Job
    template_name = 'jobs/create.html'
    fields = ['customerName', 'jobType', 'status', 'appointmentDate', 'technician']

class JobUpdateView(UpdateView):
    model = Job
    template_name = 'jobs/detail.html'
    fields = ['customerName', 'jobType', 'status', 'appointmentDate', 'technician'] 


@api_view(['GET', 'POST'])
def jobData(request):
    if request.method == 'GET':
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
def jobActions(request, pk):
    try:
        job = Job.objects.get(pk=pk)
    except Job.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = JobSerializer(job)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = JobSerializer(job, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)











        



    
    