// frontend/components/DoctorRecommendation.js
import { useState } from "react";
import axios from "axios";

const DoctorRecommendation = () => {
  const [symptoms, setSymptoms] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/recommend", {
        symptoms,
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setResults({ error: "Failed to fetch recommendation" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 p-4 bg-white shadow rounded max-w-md mx-auto">
      <h4 className="font-bold mb-3 text-lg">Find the Right Doctor</h4>

      <input
        type="text"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Enter your main symptom"
        className="border p-2 w-full mb-3 rounded"
      />

      <button
        onClick={handleRecommend}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Checking..." : "Recommend Doctor"}
      </button>

      {results?.error && (
        <p className="mt-3 text-red-600">{results.error}</p>
      )}

      {results && !results.error && (
        <div className="mt-4">
          <p>
            Recommended Specialty:{" "}
            <b className="text-blue-600">{results.recommendedSpecialty}</b>
          </p>

          {results.recommendedDoctor?.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {results.recommendedDoctor.map((doc) => (
                <li key={doc._id} className="border p-2 rounded">
                  <b>{doc.fname} {doc.lname}</b> <br />
                  <span className="text-sm text-gray-600">
                    {doc.specialty}
                  </span>
                  {doc.email && (
                    <div className="text-sm">Email: {doc.email}</div>
                  )}
                  {doc.phone && (
                    <div className="text-sm">Phone: {doc.phone}</div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-500">
              No doctors found for this specialty.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorRecommendation;
