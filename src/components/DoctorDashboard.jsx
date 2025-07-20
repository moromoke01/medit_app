import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConsultingRequests, updateConsultingRequest } from "../features/ConsultingSlice";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const { consultingRequests, isLoading } = useSelector((state) => state.consulting);
  const { user: doctor } = useSelector((state) => state.auth); // Get logged-in doctor details
  const [note, setNote] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null); // Store the selected request for rejection
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    dispatch(fetchConsultingRequests());
  }, [dispatch]);

  const handleApprove = (id) => {
    const meetingLink = prompt("Enter the meeting link:");
    if (meetingLink) {
      dispatch(updateConsultingRequest({ id, status: "approved", meetingLink }));
    }
  };

  const handleReject = (request) => {
    setSelectedRequest(request); // Set the selected request for rejection
    setIsModalOpen(true); // Open the modal
  };

  const submitRejection = () => {
    if (note.trim() === "") {
      alert("Please provide a rejection note.");
      return;
    }
    dispatch(updateConsultingRequest({ id: selectedRequest._id, status: "rejected", note }));
    setNote("");
    setIsModalOpen(false); // Close the modal
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

      {/* Consultation Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Patient Name</th> {/* Updated column */}
              <th className="px-4 py-2 border">Specialty</th>
              <th className="px-4 py-2 border">Health Query</th>
              <th className="px-4 py-2 border">Symptoms</th>
              <th className="px-4 py-2 border">Appointment Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultingRequests.map((request) => (
              <tr key={request._id} className="text-center">
                <td className="px-4 py-2 border">{request.name}</td> {/* Patient's name */}
                <td className="px-4 py-2 border">{request.specialty}</td>
                <td className="px-4 py-2 border">{request.healthQuery}</td>
                <td className="px-4 py-2 border">{request.symptoms}</td>
                <td className="px-4 py-2 border">
                  {new Date(request.appointmentDate).toLocaleString()}
                </td>
                <td className="px-4 py-2 border capitalize">{request.status || "Pending"}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 disabled:opacity-50"
                    disabled={request.status === "approved"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request)}
                    className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                    disabled={request.status === "rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rejection Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Reject Consultation</h3>
            <p><strong>To:</strong> {selectedRequest.email}</p> {/* Patient's email */}
            <p><strong>From:</strong> {doctor.email}</p> {/* Doctor's email */}
            <textarea
              placeholder="Add rejection note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded p-2 mt-4"
              rows="4"
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;