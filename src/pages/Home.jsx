import React, { useEffect, useState } from 'react'
import Nava from '../Nava'
import { Badge } from 'react-bootstrap'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [jobDetails,setJobDetails]= useState([])
    const Navigate = useNavigate();
    useEffect(()=>{
        getJobDetails();
      },[])
      
      const getJobDetails = () =>{
        axios.get('http://localhost:5000/job/getJobs')
        .then(response => {
            setJobDetails(response.data)
          console.log(jobDetails);
          
        })

        
      }
      const handleJobClick = (jobId) => {
          
        Navigate(`/job/${jobId}`);
      };
  return (
    <div style={{backgroundColor:'rgb(247,246,241)'}}>
        <div>
        <Nava/>
        </div>
      
        <div className="container mt-5">
        
        <div className="row mt-5">
            <h1 className='mt-5'>Be a part of our Mission</h1><br></br>
            <p className='mt-3'>we are looking got a passonaite people to join us on our mission.We value<br>
            </br>flat  hirerarchies , clear communication, and full ownership and responsibility</p>
        </div>
        <div className="row  mt-5 ">
         <div className="col-1  ">
            <span className='border border-black rounded-pill  p-2'>view all</span>
         </div>
         <div className="col-1">
            <span className='border rounded-pill p-2 border-black'>Development</span>
         </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <div className="col-1  ">
            <span className='border rounded-pill p-2 border-black'>Design</span>
         </div>
         <div className="col-1  ">
            <span className='border rounded-pill p-2 border-black'>Admin</span>
         </div>
         <div className="col-1  ">
            <span className='border rounded-pill p-2 border-black'>Management</span>
         </div>
        </div>
        <hr className='mt-5'/>
        {jobDetails.map((jobs,index)=>(
 <div className="row p-3" key={jobs._id}>
 <div className="col-10">
     <h3>{jobs.jobTitle}</h3>
     <p className='mt-3'> We are looking for a Product designer to join our team</p>
     <div>
     <Badge pill  className='p-2 border border-black text-black bg-transparent'>
<AccessTimeIcon/> {jobs.jobType}
</Badge>&nbsp;&nbsp;&nbsp;&nbsp;
<Badge pill  className='p-2 border border-black text-black bg-transparent' >
<LocationOnIcon/> {jobs.jobLocation}
</Badge>
     </div>
 </div>
 <div className="col-2">
 <Button color="black"  className='border border-black rounded-pill' onClick={() => handleJobClick(jobs._id)}>Apply</Button>
 </div>
 <hr className='mt-3'/>
</div>

        ))}
       
        
      </div>
    </div>
  )
}

export default Home
