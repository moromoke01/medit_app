import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConsultingRequestForSpecialist,
  updateConsultingRequestStatus,
} from "../../../features/ConsultingSlice";
import { useState, useEffect } from "react";
import MessageModal from "./MessageModal";
import NotetakerModal from "./NotetakerModal"; // ✅ Import modal version of Notetaker

const stats = [
  { label: "Total Consultations", value: 75 },
  { label: "Pending Request", value: 5 },
  { label: "Approved Request", value: 70 },
];

const Doc_Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalSubject, setModalSubject] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showNotetakerId, setShowNotetakerId] = useState(null); // ✅ Track which patient opens the modal

  const dispatch = useDispatch();
  const { consultingRequests, loading } = useSelector(
    (state) => state.consulting
  );

  useEffect(() => {
    dispatch(fetchConsultingRequestForSpecialist());
  }, [dispatch]);

  const handleUpdateStatus = (id, status) => {
    dispatch(updateConsultingRequestStatus({ id, status }))
      .then(() => alert(`Request ${status}`))
      .catch((error) => console.error("Failed to update request status:", error));
  };

  const pendingRequests = consultingRequests.filter(
    (req) => req.status === "pending"
  );
  const processedRequests = consultingRequests.filter(
    (req) => req.status !== "pending"
  );

  const openModal = (requestId, type) => {
    setSelectedRequestId(requestId);
    setModalType(type);
    setModalSubject(
      type === "approved" ? "Approval Message" : "Rejection Message"
    );
    setModalMessage("");
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalMessage.trim()) return alert("Please enter a message");

    try {
      await dispatch(
        updateConsultingRequestStatus({
          id: selectedRequestId,
          status: modalType,
          subject: modalSubject,
          message: modalMessage,
        })
      ).unwrap();
      alert(`Consultation successfully ${modalType}`);
      setShowModal(false);
      setModalMessage("");
      setModalSubject("");
      setSelectedRequestId(null);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">
          Doctor Dashboard
        </h2>
        <nav className="text-left">
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Consultations
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Patient
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Schedule
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
            >
              <span className="text-3xl font-bold text-blue-600">
                {stat.value}
              </span>
              <span className="text-gray-500 mt-2">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Pending Requests */}
        <div className="mb-24">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            New Appointment Request
          </h3>
          <div className="bg-white rounded-lg shadow p-4">
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-gray-600">Patient</th>
                  <th className="py-2 px-4 text-gray-600">Health Query</th>
                  <th className="py-2 px-4 text-gray-600">Schedule</th>
                  <th className="py-2 px-4 text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.length ? (
                  pendingRequests.map((req) => (
                    <tr key={req._id} className="border-t hover:bg-gray-50">
                      <td className="py-2 px-4">{req.patientName}</td>
                      <td className="py-2 px-4">{req.healthQuery}</td>
                      <td className="py-2 px-4">{req.appointmentDate}</td>
                      <td className="py-2 px-4 flex gap-3 items-center">
                        <MdCancel
                          className="text-red-600 text-2xl cursor-pointer"
                          onClick={() => openModal(req._id, "rejected")}
                        />
                        <IoIosCheckmarkCircle
                          className="text-green-600 text-2xl cursor-pointer"
                          onClick={() => openModal(req._id, "approved")}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 text-gray-500"
                    >
                      No consultation requests available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Processed Requests */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Patient Appointment Information
          </h3>
          <div className="bg-white rounded-lg shadow p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-gray-600">Patient Name</th>
                  <th className="py-2 px-4 text-gray-600">Health Query</th>
                  <th className="py-2 px-4 text-gray-600">Schedule</th>
                  <th className="py-2 px-4 text-gray-600">Status</th>
                  <th className="py-2 px-4 text-gray-600 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {processedRequests.length ? (
                  processedRequests.map((req) => (
                    <tr key={req._id} className="border-t hover:bg-gray-50">
                      <td className="py-2 px-4">{req.patientName}</td>
                      <td className="py-2 px-4">{req.healthQuery}</td>
                      <td className="py-2 px-4">{req.appointmentDate}</td>
                      <td
                        className={`font-semibold ${
                          req.status === "approved"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {req.status}
                      </td>
                      <td className="py-2 px-4 text-center relative">
                        <button
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId === req._id ? null : req._id
                            )
                          }
                          className="bg-blue-600 text-white rounded-md py-2 px-4"
                        >
                          View
                        </button>

                        {openDropdownId === req._id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                            <ul>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setShowNotetakerId(req._id);
                                  setOpenDropdownId(null);
                                }}
                              >
                                Notetaker
                              </li>
                            </ul>
                          </div>
                        )}

                        {/* ✅ Pop-up AI Notetaker Modal */}
                        {showNotetakerId === req._id && (
                          <NotetakerModal
                            patientId={req.patientId}
                            patientName={req.patientName}
                            healthQuery={req.healthQuery}
                            onClose={() => setShowNotetakerId(null)}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-gray-500"
                    >
                      No processed requests available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Message Modal */}
        <MessageModal
          show={showModal}
          type={modalType}
          subject={modalSubject}
          message={modalMessage}
          onChangeMessage={(e) => setModalMessage(e.target.value)}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        />
      </main>
    </div>
  );
};

export default Doc_Dashboard;
