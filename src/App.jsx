import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/signup'
import VerifyOTP from './pages/Auth/verifyAuth/VerifyOTP'
import ConsultSpecialist from './pages/ConsultingPage/ConsultSpecialist'
import Home from './pages/Home/Homepage'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'


function App() {
 

  return (
   
    <>
    <Router>
    <Navbar />
      <Routes>
      <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/verify" element={<VerifyOTP />}/>
        <Route path="/ConsultingPage" element={<ConsultSpecialist />}/>
        <Route path="/Dashboard" element={<Dashboard />} />
        {/* <Route path="/doctor-dashboard" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} /> */}
      </Routes>
    </Router>
    </>

  )
}

export default App
