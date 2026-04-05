import React, { useState, useEffect } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsultingRequests } from '../../../features/ConsultingSlice.js';

export default function Record_Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSubject, setModalSubject] = useState("");

  const handleViewMessage = (message, subject) => {
    setModalMessage(message);
    setModalSubject(subject);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
    setModalSubject("");
  };

  const dispatch = useDispatch();

  const { consultingRequests, isLoading, error } = useSelector((state) => state.consulting);


  //fetch all consulting requests on mount
  useEffect(() => {
    dispatch(fetchConsultingRequests());
  }, [dispatch]);

  //filter requests for the logged-in patient
  const patientId = useSelector((state) => state.auth.user._id);
  const patientAppointments = consultingRequests.filter(request => request.patientId === patientId);


  return (
    <div className='flex min-h-screen w-full bg-gray-50'>
      <main className='flex-1 p-6'>
        <h1 className='text-3xl font-bold mb-6'>Welcome to Your Dashboard</h1>
        <p className='text-gray-700'>Here you can manage your appointments, view doctors, and update your profile.</p>

        {/* Pending Consultation Request */}
        <div className="mb-24" id='request_record'>
          <h3 className="text-xl text-left font-semibold mb-4 mt-8 text-gray-700">
            Appointment Records
          </h3>
          <div className="bg-white rounded-lg shadow p-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4 text-gray-600">Doctor</th>
                  <th className="text-left py-2 px-4 text-gray-600">Health Query</th>
                  <th className="text-left py-2 px-4 text-gray-600">Schedule</th>
                  <th className="text-left py-2 px-4 text-gray-600">Type</th>
                  <th className="text-left py-2 px-4 text-gray-600">Status</th>
                  <th className="text-left py-2 px-4 text-gray-600">Action</th>
                  <th className="text-left py-2 px-4 text-gray-600">Call</th>
                </tr>
              </thead>

              <tbody>
                {patientAppointments.length > 0 ? (
                  patientAppointments.map((a, idx) => (
                    <tr key={idx} className="border-t text-left">
                      <td className="py-2 px-3">{a.specialistName}</td>
                      <td className="py-2 px-3">{a.healthQuery}</td>
                      <td className="py-2 px-3">{new Date(a.appointmentDate).toLocaleDateString()}</td>
                      <td className="py-2 px-3">{a.type}</td>

                      <td className="py-2 px-3">
                        {a.status === "approved" ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <IoIosCheckmarkCircle /> Confirmed
                          </span>
                        ) : a.status === "pending" ? (
                          <span className="text-yellow-600 flex items-center gap-1">
                            <MdCancel /> Pending
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
                            <MdCancel /> Rejected
                          </span>
                        )}
                      </td>

                      <td className="py-2 px-3 flex gap-2">
                        <button
                          className="bg-blue-600 text-white rounded-md py-1 px-3"
                          onClick={() => handleViewMessage(a.message, a.subject)}
                        >
                          View
                        </button>
                        </td>
                        
                        <td>

                        {a.status === "approved" && a.channel ? (
                          <Link
                            to={`/video/${a.channel}`}
                            className="bg-green-600 text-white rounded-md py-1 px-3 inline-block"
                          >
                            Join Video Call
                          </Link>
                        ) : null}

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

            {/* Modal */}
            {showModal && (
              <div className='fixed inset-0 flex items-center justify-center bg-[#0e7fcb] bg-opacity-50 z-50'>
                <div className="bg-white p-6 rounded shadow-lg">
                  <h3><b>{modalSubject}</b></h3>
                  <p>{modalMessage}</p>
                  <button
                    onClick={closeModal}
                    className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'>Close</button>
                </div>

              </div>

            )}
          </div>
        </div>
        <div id='profile'></div>
      </main>
    </div>
  )
}
