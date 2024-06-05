document.addEventListener('DOMContentLoaded', function(){


    const jobList = document.getElementById('job-list'); 
    const jobDetail = document.getElementById('job-detail'); 

    function getJobs(){

        fetch('http://127.0.0.1:8000/jobs/').then(response => response.json())
        .then(data => {
            displayJobs(data); 
        }).catch(error => {
            console.error("Error fetching jobs: ", error); 
        }); 
    }

    function displayJobs(jobs){
        const ul = document.createElement('ul'); 
        jobs.forEach(job => {
            const li = document.createElement('li'); 
            li.textContent = `${job.customerName} - ${job.jobType}`; 

            li.addEventListener('click', () => getJobDetails(job.id)); 
                
            ul.appendChild(li); 
                
        });

        jobList.innerHTML = ''; 
        jobList.appendChild(ul); 

    }

    function getJobDetails(id){

        fetch(`http://127.0.0.1:8000/jobs/${id}/`).then(response => response.json())
        .then(data => {
            displayJobDetails(data); 
        }).catch(error => {
            console.error("Error fetching job details: ", error); 
        }); 
    }

    function displayJobDetails(job){
        jobDetail.innerHTML = `
        <h2>Jobs</h2>
        <p><strong>Customer Name</strong>${job.customerName}</p>
        <p><strong>Job Type</strong>${job.jobType}</p>
        <p><strong>Status</strong>${job.status}</p>
        <p><strong>Appointment Date</strong>${job.appointmentDate}</p>
        <p><strong>Technician</strong>${job.technician}</p>`
             
    }

    getJobs(); 

});