import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import VerifyOTP from './pages/Auth/verifyAuth/VerifyOTP'
import ConsultSpecialist from './pages/ConsultingPage/ConsultSpecialist'
import Home from './pages/Home/Homepage'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import ConsultationRequest from './pages/AI_integration/ConsultationRequest'
import DoctorListing from './pages/SpecialistListingPage/DoctorListing'
import TriageCheck from './pages/AI_integration/triageCheck'
import DoctorRecommendation from './pages/AI_integration/recommendation/recommendDoctor'
import NoteTaker from './pages/Dashboard/Doctor_Dashboard/Notetaker'
import VideoCallWrapper from "./pages/Video_conferencing/VideoCallWrapper";




function App() {


  return (

    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<VerifyOTP />} />
          <Route path='/doctorList' element={<DoctorListing />} />
          <Route path='/Symptoms-checker' element={<TriageCheck />} />
          <Route path='/recommend-doctor' element={<DoctorRecommendation />} />
           <Route path="/video/:channel" element={<VideoCallWrapper />} />
          <Route path='/doctor-notetaker' element={<NoteTaker />} />

          <Route path="/ConsultSpecialist" element={
            <ProtectedRoute>
              <ConsultSpecialist />
            </ProtectedRoute>
          } />

          
          <Route path="/Dashboard" element={<Dashboard />} />
          {/* <Route path="/doctor-dashboard" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} /> */}
        </Routes>
      </Router>
      
    </>

  )
}



export default App
