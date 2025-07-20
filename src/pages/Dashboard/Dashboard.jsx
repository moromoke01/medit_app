import DoctorDashboard from '../../components/DoctorDashboard'
import PatientDashboard from '../../components/PatientDashboard'
import { useSelector } from "react-redux"

const Dashboard = () => {
    const {user} = useSelector((state) => state.auth);

    if (!user) {
        return <p>Please log in to access the dasboard </p>
    }

    return(
        <div>
            {user.role == "doctor" ? <DoctorDashboard /> : <PatientDashboard />}
        </div>
    );
};

export default Dashboard;