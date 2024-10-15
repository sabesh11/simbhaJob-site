import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 
import axios from 'axios';
import imgg from '../assets/green_eco_loop_leaf_check_mark.jpg'
import { useNavigate } from 'react-router-dom';

const ApplicationPage = () => {
  const [eachApply, setEachApply] = useState({
    firstName: '',
    phoneNumber: '',
    email:''
  });
  const [selectedLocation, setSelectedLocation] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [image, setImage] = useState(null);
  const fileInput = useRef(null);
  const [job, setJob] = useState(null); 
  const [uploadResume, setUploadStatus] = useState();
  const [uploadImage, setUploadImageStatus] = useState();
  const [resumeDisabled,setResumeDisabled]=useState(false)
  const [imageDisabled,setImageDisabled]=useState(false)
  const [changeComp,setchangeComp]=useState(true)
  const Navigate = useNavigate();

  useEffect(() => {
    
    setTimeout(() => {
      const storedJobData = localStorage.getItem('job');
      if (storedJobData) {
        setJob(JSON.parse(storedJobData)); 
      }
    }, 2000); 
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEachApply(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    setFileNames([file.name]);
    setEachApply(prevState => ({ ...prevState, resume: file }));
    setResumeDisabled(true)

    const formData = new FormData();
    formData.append('file', file); // Append resume to formData

    // API call immediately on file select
    try {
      const response = await axios.post('http://localhost:5000/application/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus(response.data);
      console.log(uploadResume)
    } catch (error) {
     
      console.error(error);
    }
  };

  const handleImageSelect = async (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setEachApply(prevState => ({ ...prevState, image: selectedImage }));
    setImageDisabled(true)

    const formData = new FormData();
    formData.append('file', selectedImage); // Append image to formData

    // API call immediately on image select
    try {
      const response = await axios.post('http://localhost:5000/application/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadImageStatus(response.data);
      console.log(uploadImage);
      
    } catch (error) {
      
      console.error(error);
    }
  };

  const triggerFileSelect = () => {
    fileInput.current.click();
  };

  const sendConfirmation =  () => {
  let payload={
    job:job,
    applicant:eachApply.firstName,
    resume:uploadResume,
    image:uploadImage,
    mobilenumber:eachApply.phoneNumber,
    email:eachApply.email,
}
console.log(payload);

try {
  const response =  axios.post('http://localhost:5000/application/addApplication',payload);
  
  console.log(response.data);
  setchangeComp(false)
  
} catch (error) {
  
  console.error(error);
}
  };

  const backToHome = () =>{
    Navigate('/')
  }

  return (
    <>
    {changeComp == true ?
    <div>
      <div className="container-fluid container-fluidd">
        <div className="row justify-content-center p-3">
          <div className="col-md-3 col-7 text-center mt-3">
            <img src="" className="img-fluid" alt="Company Logo" />
          </div>
          
          {/* Show Skeleton for job title if job data is not loaded */}
          <h2 className="text-center mt-4" style={{ fontWeight: 900, color: 'red' }}>
            {job ? job.jobTitle : <Skeleton width={200} height={40} />}
          </h2>
          
          <p className="text-center fs-4 mt-3 text-black">
            {job ? 'Join our team and let\'s grow your future here!' : <Skeleton width={300} />}
          </p>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-12 mt-5">
            <h3 className="text-center" style={{ fontWeight: 600, color: 'red' }}>
              Apply for your dream job
            </h3>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="col-md-10 col-12 right-box mt-3">
            <div className="row align-items-center">
              <InputGroup className="input-group">
                <input
                  type="text"
                  className="p-2 form-control form-control-lg fs-6"
                  value={eachApply.firstName}
                  name="firstName"
                  onChange={handleChange}
                  placeholder="Candidate Name"
                />
              </InputGroup>

              <InputGroup className="input-group mt-4">
                <input
                  type="text"
                  className="p-2 form-control form-control-lg fs-6"
                  value={eachApply.phoneNumber}
                  onChange={handleChange}
                  name="phoneNumber"
                  placeholder="WhatsApp Number"
                />
              </InputGroup>

              <InputGroup className="input-group mt-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={eachApply.email}
                  onChange={handleChange}
                  className="p-2 form-control form-control-lg fs-6"
                  placeholder="Enter your mail"
                 
                />
              </InputGroup>

              <InputGroup className="input-group mt-4">
                {/* Show Skeleton for location select if job data is not loaded */}
                {job ? (
                  <Form.Select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="p-2"
                  >
                    <option value="" disabled>Select Location</option>
                    <option value={job.jobLocation}>{job.jobLocation}</option>
                  </Form.Select>
                ) : (
                  <Skeleton width={300} height={40} />
                )}
              </InputGroup>

              <InputGroup className="input-group mt-4">
                <div
                  className="dropzone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileSelect(e);
                  }}
                  disabled={resumeDisabled}
                  onClick={triggerFileSelect}
                >
                  <p className="dropzone-text">
                    {fileNames.length === 0 ? (
                      <>
                        Drag and drop CV here<br />
                        <span className="text-danger" style={{ fontSize: '15px' }}>*pdf only</span>
                      </>
                    ) : (
                      fileNames.join(', ')
                    )}
                  </p>
                  <input
                    type="file"
                    ref={fileInput}
                    onChange={handleFileSelect}
                    multiple
                    style={{ display: 'none' }}
                    accept=".pdf"
                  />
                </div>
              </InputGroup>

              <InputGroup className="input-group mt-4">
                <Form.Control
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImageSelect}
                  disabled={imageDisabled}
                />
              </InputGroup>

              <div className="mt-4 d-flex justify-content-center">
                <Button
                  className="p-2 fs-5 rounded-pill"
                  style={{ width: '100%', backgroundColor: 'red',border:'none' }}
                  onClick={sendConfirmation}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>:<div>
      <div className="container ">
        <div className="row mt-3 justify-content-center p-3">
          <div className="col-6 mt-5">
            <img src={imgg} alt="" className='img-fluid' />
            </div>
            <div className="row mt-1">
            <p style={{fontSize:'20px',textAlign:'center'}}>your Application  has been submitted successfully</p>
            </div>
            <div className='row mt-5'>
            <Button
                  className="p-1 fs-5 rounded-pill"
                  style={{ width: '100%', backgroundColor: 'red',border:'none' }}
                 onClick={backToHome}
                >
                  Done
                </Button>
            </div>
           </div></div></div>}
    </>
  );
};

export default ApplicationPage;
