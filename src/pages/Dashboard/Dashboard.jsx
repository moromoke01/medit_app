import DoctorDashboard from '../../pages/Dashboard/Doctor_Dashboard/Doc_Dashboard.jsx'; 
import PatientDashboard from '../../pages/Dashboard/Patient_Dashboard/Pat_Dashboard.jsx'; 
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"


const Dashboard = () => {

    const {user} = useSelector((state) => state.auth);

    if (!user) {
        return <div className='mt-16'>
                <h2 className='font-bold text-2xl'>Please log in to access the dasboard</h2>
                 <p>Login <Link to="/login" className='text-blue-500'>Here </Link></p>
             </div>
    }

    return(
        <div>
            {/* Render different dashboards based on user role */}
            {user.role == "doctor" ? <DoctorDashboard /> : <PatientDashboard />}
        </div>
    );
};

export default Dashboard;