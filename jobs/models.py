from django.db import models

class Job(models.Model):

    # JOB_STATUS_CHOICES = [
    #     ('scheduled', 'Scheduled'), 
    #     ('in_progress', 'In_Progress'), 
    #     ('completed', 'Completed'), 
    # ]

    id = models.AutoField(primary_key=True)
    customerName = models.CharField(max_length=100)
    jobType = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    appointmentDate = models.DateTimeField()
    technician = models.CharField(max_length=100)

    def __str__(self):
        return f"Job {self.id} - {self.customerName}"
