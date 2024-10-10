import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import OtpVerification from './pages/OtpVerification'


function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/otpverification" element={<OtpVerification />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
