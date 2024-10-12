import React, { useEffect, useState } from 'react'
import Nava from '../Nava'
// import { Badge } from 'react-bootstrap'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import Bar from '../Bar';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import  {Badge}  from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; 


const Home = () => {

  const jobTitleList = [
    "Software Developer", "IT Support Specialist", "System Admin", "Network Engineer", "Database Administrator",
    "Database Administrator", "DevOps Engineer", "Cloud Architect", "Cybersecurity Analyst", "Technical Support Engineer",
    "IT Project Manager", "Full-Stack Developer", "IT Consultant", "Front End Developer", "Back End Developer", "IT Operations Manager",
    "IT Analyst", "Machine Learning Engineer", "Python Developer", "Java Developer", "Nodejs Developer", "Content Writer", "Blog Writer",
    "Content Editor", "HR Manager", "YouTube Content Creator", "Telecaller", "Sales & Marketing", "Tutor"
  ];

  const [jobDetails, setJobDetails] = useState([])
  const Navigate = useNavigate();
  useEffect(() => {
    getJobDetails();
  }, [])

  const getJobDetails = () => {
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
    <div >
      <div>
        <Bar />
      </div>

      <div className="container mt-5">

        <div className="row ">
          <h1 className='mt-4'>Be a part of our Mission</h1><br></br>
          <p className='mt-3'>we are looking got a passonaite people to join us on our mission.We value<br>
          </br>flat  hirerarchies , clear communication, and full ownership and responsibility</p>
        </div>
        <div className="row ps-0 pe-0 justify-content-center d-md-flex d-none mt-5">
          
          <div className="col-5 p-0 ps-0 pe-0">
            <TextField
              id="filled-search"
              fullWidth
              select
              name='jobTitle'
              InputProps={{
                style: {
                  borderTopRightRadius: '0',
                  borderBottomRightRadius: '0',
                  borderRight: 'none',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& fieldset': {
                  borderRight: 'none',

                },
              }}
              variant="outlined"
            >
              {jobTitleList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>

          
          <div className="col-5 ps-0 pe-0">
            <TextField
              id="outlined-basic-right"

              fullWidth
              select
              placeholder='search JobTitle'
              name='jobTitle'
              InputProps={{
                style: {
                  borderTopLeftRadius: '0',
                  borderBottomLeftRadius: '0',
           borderRight:'0'

                },
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button


                      style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: 'red', color: 'white' }}
                    >
                      Find Job
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& fieldset': {
                  borderLeft: 'none', // Removes the right border of the first TextField
                },
              }}
              variant="outlined"
            >
              {jobTitleList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div className="row  justify-content-center d-md-none d-block ms-1">
          {/* First TextField */}
          <div className="col-11 ">
            <TextField
              id="filled-search"

              fullWidth
              select
              name='jobTitle'
              InputProps={{
                style: {
                  borderTopRightRadius: '0',
                  borderBottomRightRadius: '0',
                  borderRight: 'none',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon />
                  </InputAdornment>
                ),
              }}

              variant="outlined"
            >
              {jobTitleList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* Second TextField */}
          <div className="col-11">
            <TextField
             

              fullWidth
              select
              placeholder='search JobTitle'
              name='jobTitle'
              InputProps={{

                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),

              }}

              variant="outlined"
            >
              {jobTitleList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="col-11 mt-2">
            <Button
              fullWidth

              style={{ padding: '10px 10px', borderRadius: '10px', backgroundColor: 'red', color: 'white',fontFamily:'"Baskervville SC", serif' }}
            >
              Find Job
            </Button>
          </div>
        </div>
        
        <hr className='mt-5' />
        {jobDetails.map((jobs, index) => (
          <div className="row p-4 mt-4 shadow-2 m-1" key={jobs._id} style={{border:'2px solid #f4f4f4',borderRadius:'10px'}} onClick={() => handleJobClick(jobs._id)}>
            <div className="col-12 col-md-10" >
              <h3>{jobs.jobTitle}</h3>
              <p className='p-0'>📍{jobs.jobLocation}</p>
              <div>
                <Badge pill className='p-1 border rounded' sx={{backgroundColor:'#d3ffcf'}}>
                  <AccessTimeIcon sx={{color:'green'}}/> {jobs.jobType}
                </Badge>&nbsp;&nbsp;&nbsp;&nbsp;
                
                <Badge pill className='p-1 border rounded'  sx={{backgroundColor:'#d3ffcf'}}>
                  <AttachMoneyIcon sx={{color:'green'}}/> {jobs.Salary }
                </Badge>
              </div>
            </div>
            <div className="col-2 d-md-block d-none">
              <Button sx={{color:'red'}} fullWidth className='border border-red rounded ' onClick={() => handleJobClick(jobs._id)}>Apply</Button>
            </div>
            
          </div>

        ))}


      </div>
    </div>
  )
}

export default Home
