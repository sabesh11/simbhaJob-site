import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import signinimage from '../assets/My password-amico.svg'
import otpVefiryimg from '../assets/My password-pana.svg'
import React, { useState } from 'react'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import OtpInput from 'react-otp-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpVerification = () => {

    const [mail, setmail] = useState();
    const [loading, setLoading] = useState(false);
    const [changeDiv, setChangeDiv] = useState(true);
    const [timer, setTimer] = useState(60);
  const [intervalId, setIntervalId] = useState(null);
    const [otp, setOTP] = useState()
    const handleMail = (event) => {
        setmail(event.target.value)
        console.log(mail);

    }

    const setOtp = (otpValue) => {
        setOTP(otpValue)
    }

    const verifyOTP = () => {
        setLoading(true);
        console.log(otp);
        const payload = {
            email: mail,
            otp: otp
        };
        axios.post("http://localhost:5000/application//verify-otp", payload)
            .then(response => {
                toast.success("OTP verified successfully", {
                    position: "top-center",
                });
                console.log(response.data);


                setLoading(false);

            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }

    const getOTP = () => {
        console.log(mail);
        setLoading(true);
        axios.post("http://localhost:5000/application/send-otp/" + mail)
            .then(response => {
                toast.success("OTP send for your Mail", {
                    position: "top-center",
                });
                console.log(response.data);

                setChangeDiv(false);
                setLoading(false);
                startTimer();

            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }

    const startTimer = () => {
        setTimer(60);  
      
        
        const id = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer > 1) {
              return prevTimer - 1;
            } else {
              clearInterval(id);
              
              return 0;
            }
          });
        }, 1000);
    
        setIntervalId(id); 
      };

      const resendOtp = () =>{
        toast.success("OTP resend to your Mail", {
            position: "top-center",
        });
        getOTP();
        startTimer();
      }

      const backToOTPsend = () =>{
        setChangeDiv(true);
      }
    return (
        <div>
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-6 align-self-center  p-2 d-md-block d-none" style={{ backgroundColor: 'red' }}>
                        <img src={signinimage} height={570} />
                    </div>
                    {changeDiv == true ?
                        <div className="col-md-5 align-self-center  p-5 text-center" >
                            <h1 style={{ color: 'red' }}>OTP
                                Verification</h1>
                            <div className="text-center mb-3 d-md-none d-block">
                                <img src={signinimage} alt="" height="160" width="160" />
                            </div>
                            <div className="mt-3 text-center">
                            <small className="text-muted">We will send you a 4-digit code</small>
                            </div>
                            <form >
                                <div className="mt-5">
                                    <TextField
                                        id="outlined-basic"
                                        label="Enter your E-mail"
                                        fullWidth
                                        onChange={handleMail}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MailIcon />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        variant="outlined"
                                    />


                                </div>


                                <div className="mt-4 ">
                                    <button className="btn w-100 text-white" type="button" style={{ backgroundColor: 'red' }} onClick={getOTP} disabled={loading}> {loading ? (
                                        <CircularProgress size={24} style={{ color: '#fff' }} />
                                    ) : (
                                        'Get OTP'
                                    )}</button>
                                </div>
                            </form>
                        </div>
                        : <div className="col-md-5 align-self-center  p-5 text-center" >
                            <h1 style={{ color: 'red' }}>Verification Code</h1>
                            <div className="text-center mb-3 d-md-none d-block">
                                <img src={otpVefiryimg} alt="" height="160" width="160" />
                            </div>
                            <div className="mt-3 text-center">
                               
                                {timer > 0 ? (
        <p style={{ textAlign: 'center' }}>
          Time remaining: <span style={{ color: 'red' }}>{timer} seconds</span>
        </p>
      ) : (
        <p style={{ textAlign: 'center', color: 'red' }}>
          OTP expired. Please request a new one.
        </p>
      )}
                            </div>
                            <form >
                                <div className="mt-4">
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        renderSeparator={<span>&nbsp;</span>}
                                        renderInput={(props) => <input {...props} />}
                                        inputStyle={{
                                            width: '40px',
                                            height: '40px',
                                            margin: '10px',
                                            fontSize: '20px',
                                            borderRadius: '4px',
                                            border: '1px solid rgba(0, 0, 0, 0.3)',
                                            textAlign: 'center',
                                            outline: 'none',
                                        }}
                                        containerStyle={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    />


                                </div>


                                <div className="mt-4 col-md-12  ">
                                    <button className="btn w-75 text-white text-center" type="button" style={{ backgroundColor: 'red' }} onClick={timer === 0 ? resendOtp() : verifyOTP()} disabled={loading}> {loading ? (
                                        <CircularProgress size={24} style={{ color: '#fff' }} />
                                    ) : (
                                        'Submit OTP'
                                    )}</button>
                                     <button  className="mt-3 w-100 text-white rounded-pill" style={{backgroundColor: 'red'}} onClick={backToOTPsend}>back</button>
                                </div>
                               
                            </form>
                        </div>}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default OtpVerification
