    document.addEventListener('DOMContentLoaded', function(){
 
        const jobForm = document.getElementById('job-form'); 
        const updateJobForm = document.getElementById('update-job-form'); 
        const updateFormContainer = document.getElementById('update-form-container'); 
        const jobsTableBody = document.getElementById('jobs-table-body'); 

        //Buttons
        const updateButton = document.getElementById('update-button'); 
        const deleteButton = document.getElementById('delete-button'); 

        console.log("Works Here 1"); 

        if(jobsTableBody){
            getJobs(); 
        }

        if(updateButton && deleteButton){
            const jobId = updateButton.getAttribute('data-job-id'); 

            updateButton.addEventListener('click', function(){
                showUpdateForm(jobId); 
            }); 

            deleteButton.addEventListener('click', function(){
                deleteJob(jobId); 
            })
        }

        console.log("Works Here 2");

        if(updateJobForm){
            updateJobForm.addEventListener('submit', function(event){
                event.preventDefault(); 
                const jobId = updateJobForm.dataset.jobId; 
                const updatedData = {
                    customerName: document.getElementById('update-customer').value, 
                    jobType: document.getElementById('update-type').valye, 
                    status: document.getElementById('update-status').value, 
                    appointmentDate: document.getElementById('update-date').value, 
                    technician: document.getElementById('update-technician').value 
                }; 
                updateJob(jobId, updatedData); 
            }); 
        }

        console.log("Works Here 3");

        if(jobForm){
            jobForm.addEventListener('submit', function(event){
                event.preventDefault(); 
                createJob(); 
            }); 

        }  
        
        console.log("Works Here 4");

        function getJobs(){
    
            fetch('http://127.0.0.1:8000/api/jobs/').then(response => response.json())
            .then(data => {
                jobsTableBody.innerHTML = '';
                data.forEach(job => {
                    const row = document.createElement('tr');  
                    row.innerHTML = `<td>${job.customerName}</td>
                    <td>${job.jobType}</td>
                    <td><a href="/${job.id}" class="btn btn-primary">View</a></td>`; 
                    jobsTableBody.appendChild(row);
                }); 
            }) 
                 
            .catch(error => {
                console.error("Error fetching jobs: ", error); 
            }); 
        }

    

        function createJob(){
            const customerName = document.getElementById('customerName').value; 
            const jobType = document.getElementById('jobType').value;  
            const status = document.getElementById('status').value; 
            const appointmentDate = document.getElementById('appointmentDate').value; 
            const technician = document.getElementById('technician').value; 

            const jobData = {
                customerName: customerName, 
                jobType: jobType, 
                status: status, 
                appointmentDate: appointmentDate, 
                technician: technician
            }; 

            const options = {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(jobData)
            }; 

            fetch('http://127.0.0.1:8000/api/jobs/', options)
            .then(response => {
                if(!response.ok){
                    throw new Error('Network Error: ', response.statusText); 
                }
                alert('Job Created Successfully')
                return response.json()
            })
            .then(data => {
                console.log('Success: ', data); 
                getJobs(); 
            })
            .catch(error => {
                console.error('Error: ', error); 
            }); 

            
        }

        async function deleteJob(jobId){

            try{
                const deleteMethod = {
                    method: 'DELETE'
                };
                fetch(`http://127.0.0.1:8000/api/jobs/${jobId}/`, deleteMethod)
                .then(response => {
                    if(response.ok){
                        alert('Job deleted successfully'); 
                        window.location.href = '/'; 
                    }
                    else{
                        alert('Failed to delete job'); 
                    }

                }) 
                .catch(error => {
                    console.error('Error deleting job with response', error); 
                });        
            }
            
            catch(error){
                console.error('Error deleting job', error); 
            }
        }

        function showUpdateForm(jobId){

            fetch(`http://127.0.0.1:8000/api/jobs/${jobId}/`)
            .then(response => response.json())
            .then(job => {
                
                
                document.getElementById('update-customer').value = job.customerName; 
                document.getElementById('update-type').value = job.jobType; 
                document.getElementById('update-status').value = job.status; 
                document.getElementById('update-date').value = job.appointmentDate.split('Z')[0];  
                document.getElementById('update-technician').value = job.technician; 

                updateJobForm.dataset.jobId = jobId; 
                updateFormContainer.style.display = 'block'; 
            })
            .catch(error => {
                console.error("Error fetching job: ", error); 
            }); 
 
        }

        function updateJob(jobId, updatedData){ 

            const putMethod = {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            }; 

            fetch(`http://127.0.0.1:8000/api/jobs/${jobId}/`, putMethod)
            .then(response => {
                if(response.ok){
                    alert('Job Updated Successfully'); 
                    window.location.href = `/${jobId}/`; 

                }
                else{
                    alert('Failed to update job'); 
                }
            })
            .catch(error => {
                console.error("Error updating job: ", error); 
            }); 
        }   
    
    });

