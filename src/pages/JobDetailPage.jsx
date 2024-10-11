import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles
import Bar from '../Bar';
// import { BiGeoAltFill, BiWallet } from 'react-icons/bi'; 

const JobDetailPage = () => {
  const { jobId } = useParams(); 
  const [job, setJob] = useState(null);  // Initially null, indicating no data
  const [isLoading, setIsLoading] = useState(true); // To handle the loading state
  const isMobile = window.innerWidth <= 768;
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/job/getJob/${jobId}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setIsLoading(false); // Set loading to false after the API call completes
      }
    };

    fetchJobDetail();
  }, [jobId]);

  const applyTo = () => {
   Navigate('/otpverification')
  };

  return (
    <div>
      <Bar/>
      <div className="jobcover" style={{ marginTop: '70px', marginBottom: '30px' }}>
        {/* brandNav component should be replaced with actual React component */}
        <div className="container">
          <div className="row mt-5">
            <div className="col">
              {isLoading ? (
                <Skeleton width={200} height={20} />
              ) : (
                `Posted Date: ${format(new Date(job.createdAt), 'MM/dd/yyyy')}`
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row mt-4">
            <div className="col-12 col-md-9">
              {isLoading ? (
                <Skeleton height={40} width={300} />
              ) : (
                <h1 style={{color:'red'}}>{job.jobTitle}</h1>
              )}

              {isLoading ? (
                <Skeleton height={20} width={250} />
              ) : (
                <div>
                  <span>
                    {/* <BiGeoAltFill /> */} 
                    <span className="fs-6" style={{ color: 'grey' }}>{job.jobLocation}</span>
                  </span>
                </div>
              )}

              <div className="mt-3">
                {isLoading ? (
                  <Skeleton height={20} width={200} />
                ) : (
                  <>
                    <span>salary: {job.Salary}</span>
                    <span style={{ color: '#cecfcf', fontSize: '25px', fontWeight: '100' }} className="ml-1"> | </span>
                  </>
                )}
              </div>
            </div>
            <div className="col-md-2 d-md-block d-none text-end">
              <Button size="md" className="appbtncard  rounded-pill" style={{ width: '150px', fontWeight: 900 ,backgroundColor:'red',border:'none '}} onClick={applyTo} >
                Apply
              </Button>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="container">
        <div className="row justify-content-between">
          {isLoading ? (
            <Skeleton count={5} height={20} />
          ) : (
            <div className="detailed-description" dangerouslySetInnerHTML={{ __html: job.jobDescription }}></div>
          )}
        </div>
        
        <div className="row justify-content-around d-block d-md-none applycard mt-5">
          <div className="col-md-10 mt-3 mb-5">
            <Button className="appbtncard  rounded-pill" style={{ color: 'white', width: '100%', padding: '10px', position: 'sticky' , left: '0',
        bottom: '0',
        right: '0', backgroundColor:'red',border:'none'}} onClick={applyTo} >
               Apply 
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
