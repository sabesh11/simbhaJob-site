import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 

const ApplicationPage = () => {
  const [eachApply, setEachApply] = useState({
    firstName: '',
    phoneNumber: '',
    image: '',
    resume: '',
  });
  const [selectedLocation, setSelectedLocation] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [image, setImage] = useState(null);
  const fileInput = useRef(null);
  const [job, setJob] = useState(null); // Initially null to indicate loading

  useEffect(() => {
    // Simulate loading data from localStorage (you can replace it with actual API calls)
    setTimeout(() => {
      const storedJobData = localStorage.getItem('job');
      if (storedJobData) {
        setJob(JSON.parse(storedJobData)); // Set the job data after loading
      }
    }, 2000); // Simulate a 2-second load time
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEachApply(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileSelect = (e) => {
    setFileNames([...e.target.files].map(file => file.name));
  };

  const handleImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const triggerFileSelect = () => {
    fileInput.current.click();
  };

  const sendConfirmation = () => {
    console.log('Form submitted!');
  };

  return (
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
                  disabled
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
                />
              </InputGroup>

              <div className="mt-4 d-flex justify-content-center">
                <Button
                  className="p-2 fs-5 rounded-pill"
                  style={{ width: '100%', backgroundColor: 'red' }}
                  onClick={sendConfirmation}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
