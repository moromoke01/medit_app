// frontend/components/TriageCheck.js
import { useState } from "react";
import axios from "axios";

const TriageCheck = () => {
  const [symptoms, setSymptoms] = useState("");
  const [triage, setTriage] = useState("");

  const handleCheck = async () => {
    try {
      const res = await axios.post("https://healthconsultbackend.onrender.com/api/triage", {
        symptoms,
      });
      setTriage(res.data.triage);
    } catch (err) {
      console.error("Error checking triage:", err);
    }
  };

  return (
    <div className="p-4 bg-white max-w-1/2 mx-auto justify-center mt-20 rounded shadow">
      <h4 className="font-bold mb-2">Check Symptom Urgency</h4>
      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Enter your symptoms..."
        className="w-full border p-2 rounded mb-3"
      />
      <button
        onClick={handleCheck}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Check Urgency
      </button>
      {triage && (
        <p className="mt-3 text-green-600">
          Suggested urgency: <b>{triage}</b>
        </p>
      )}
    </div>
  );
};

export default TriageCheck;
