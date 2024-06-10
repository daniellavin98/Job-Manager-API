Introduction
My name is Daniel and here is my attempt at the API task. 
The api was written in Python/Django, Javascript, HTML and designed with Bootstrap 

All backend functionalities work and these can be tested in their corresponding endpoints. 

The frontend allows a user to view all the jobs in the database, view the details of the jobs, 
create a new job and delete an exiting job. 

Errors occur when trying to update an existing job. Due to time contraints, I wasn't able to fix this. 
I'm currently working as a Administrator so I didn't have the time I want to complete this task. 

Hopefully you enjoy. 

Run the Server:
Once pulled from GitHub -> create a virtual environment called 'myvenv' using 
the following command 'python -m venv myvenv
Enter the project folder "Job_Task" in the Command Prompt. 
Then run the command 'myvenv\Scripts\activate'. This will activate the virtual environment. 
The 'VE' has Django and Django Rest_Framework installed. Run 'pip show Django' to see it installed 
To run the server - run the command 'python manage.py runserver'. Go to http://127.0.0.1:8000/ to see the project running 

Backend Endpoints:
Get all Jobs: http://127.0.0.1:8000/api/jobs
Get job given id: http://127.0.0.1:8000/api/jobs/id
Post new job: http://127.0.0.1:8000/api/jobs
Update job: http://127.0.0.1:8000/api/jobs/id
Delete job: http://127.0.0.1:8000/api/jobs/id 

Frontend:
The side bar as two links, one is Job List and the other is New Job

In Job List:
See jobs at the homepage: http://127.0.0.1:8000
Click on the View button to see the details of the job
In the detail view, you will see the full details of the job, along with an Update and Delete button
Update button -> new form to update job
Delete button -> delete current job

In New Job: 
Create a new job with the form, will show in the job list. 




