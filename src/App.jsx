import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import OtpVerification from './pages/OtpVerification'
import JobDetailPage from './pages/JobDetailPage'
import ApplicationPage from './pages/ApplicationPage'


function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/job/:jobId" element={<JobDetailPage />} />
      <Route path="/otpverification" element={<OtpVerification />} />
      <Route path="/Application" element={<ApplicationPage />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
