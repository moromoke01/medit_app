import React, { useState } from "react";
import SymptomChecker from "./SymptomChecker";
import { useNavigate } from "react-router-dom";

const ConsultationRequest = () => {
  const [triage, setTriage] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to ConsultSpecialist, passing triage data
    navigate("/ConsultSpecialist", { state: { triage } });
  }

  return (

    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Start a Consultation
      </h1>

      {/* Symptom Checker first */}
      <SymptomChecker onTriageComplete={setTriage} />

      {triage && (
        <div className="mt-6">
          <p className="text-gray-700">
            Based on your symptoms: <span className="font-semibold">{triage}</span>
          </p>
          <button 
          onClick={handleContinue}
          className="bg-green-600 text-white py-2 px-4 rounded-md mt-3">
            Continue to Book Doctor
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsultationRequest;
