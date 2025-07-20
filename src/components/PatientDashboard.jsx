import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConsultingRequests } from "../features/ConsultingSlice";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const { consultingRequests, isLoading } = useSelector((state) => state.consulting);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchConsultingRequests()); // Fetch all consultation requests
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;

  const userRequests = consultingRequests.filter((request) => request.patientId === user._id);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>
      <div className="space-y-4">
        {userRequests.map((request) => (
          <div key={request._id} className="border p-4 rounded shadow">
            <p><strong>Specialty:</strong> {request.specialty}</p>
            <p><strong>Health Query:</strong> {request.healthQuery}</p>
            <p><strong>Symptoms:</strong> {request.symptoms}</p>
            <p><strong>Appointment Date:</strong> {new Date(request.appointmentDate).toLocaleString()}</p>
            <p><strong>Status:</strong> {request.status}</p>
            {request.status === "approved" && (
              <p><strong>Meeting Link:</strong> <a href={request.meetingLink} target="_blank" rel="noopener noreferrer">{request.meetingLink}</a></p>
            )}
            {request.status === "rejected" && (
              <p><strong>Rejection Note:</strong> {request.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDashboard;