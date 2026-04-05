import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveNote, clearSaveStatus} from '../../../features/noteSlice';
import { toast } from "react-toastify";

const NotetakerModal = ({ patientId, patientName,healthQuery, onClose }) => {
  const [rawNote, setRawNote] = useState("");
  const dispatch = useDispatch();

 const {loading, success, error} = useSelector((state) =>  state.note);

   const handleSaveNote = async () => {
    if(!rawNote.trim()) {
      return alert("please enter a consultation note before saving")
    }

    dispatch(saveNote({ patientId, patientName, healthQuery, rawNote}))
  };


// Handle alerts and cleanup after saving note
  useEffect(() => {
    if (success) {
      alert("Note saved successfully!");
      toast.success("Note saved successfully!");
      console.log("Note saved successfully!");
      setRawNote("");
      dispatch(clearSaveStatus());
      onClose();
    }
    if (error) {
    toast.error("Error saving note: " + error);
    console.error("Error saving note:", error);
    dispatch(clearSaveStatus());
  }

  }, [success, error, onClose]);



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>

        {/* ✅ Patient info header */}
        <h2 className="text-xl font-semibold mb-1 text-center text-blue-600">
            Consultation Note for {patientName}
        </h2>

        {/* Display patient info */}
        <p className="text-sm text-gray-600 text-center mb-4"> Health Query: <span className="font-medium">{healthQuery}</span></p>

        {/* Text input */}
        <label className="block mb-2 text-gray-700 font-medium">
          Consultation Notes
        </label>
        <textarea
          value={rawNote}
          onChange={(e) => setRawNote(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 h-32 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Write your consultation note here..."
        />

       
            <button
              onClick={handleSaveNote}
              disabled={loading}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              {loading ? 'Saving...' : 'Save Note'}
            </button>
          </div>
    
      </div>
    
  );
};

export default NotetakerModal;
