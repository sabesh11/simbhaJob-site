import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const JobDetailPage = () => {
const { jobId } = useParams(); 
const [job, setJob] = useState();

useEffect(() => {
    
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/job/getJob/${jobId}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetail();
  }, [jobId])

  return (
    <div>
      {/* {job.jobTitle} */}
    </div>
  )
}

export default JobDetailPage
