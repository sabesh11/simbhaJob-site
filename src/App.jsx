import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import OtpVerification from './pages/OtpVerification'
import JobDetailPage from './pages/JobDetailPage'


function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/job/:jobId" element={<JobDetailPage />} />
      <Route path="/otpverification" element={<OtpVerification />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
