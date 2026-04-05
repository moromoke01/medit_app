import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkSymptoms } from '../../features/symptomSlice';  



const SymptomChecker = ({onTriageComplete}) => {

    const [symptoms, setSymptoms] = useState("");
    const [duration, setDuration] = useState("");
    const [severity, setSeverity] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [result, setResult] =useState(null);

    const dispatch = useDispatch();
    const { triage, loading, error } = useSelector((state)=> state.symptoms || {});


   const handleCheck = () => {
    if (!symptoms) return alert("Please enter your symptoms");
    dispatch(checkSymptoms({symptoms, duration, severity}));
   };


        useEffect(() => {
          if (triage && onTriageComplete) onTriageComplete(triage);
        }, [triage, onTriageComplete]);
    
  return (
    <div className='p-6 bg-white rounded-lg shadow-md max-w-md mx-auto'> 
        <h2 className='text-xl font-bold mb-4 text-blue-600'>
            SymptomChecker
        </h2>

        <textarea
           className='w-full border rounded p-2 mb-3'
           placeholder="Describe your symptoms...e.g cough, headache"
           value={symptoms}
           onChange={(e) => setSymptoms(e.target.value)} 
          />

        <input 
          className='w-full border rounded p-2 mb-3'
          placeholder='Duration (e.g., 2 days)'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <select className='w-full border rounded p-2 mb-3'
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}>
            <option value="">Select Severity</option>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
        </select>   
            
    <button
        onClick={handleCheck}
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded-md w-full"
      >
        {loading ? "Checking..." : "Check Symptoms"}
      </button>

      {triage && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <h3 className="font-semibold text-gray-700">Triage Suggestion:</h3>
          <p className="text-gray-600 mt-2 whitespace-pre-line">{triage}</p>
        </div>
      )}
    </div>
  );
};


export default SymptomChecker