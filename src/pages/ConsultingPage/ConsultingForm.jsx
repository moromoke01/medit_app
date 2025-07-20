import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConsultingRequest } from "../../features/ConsultingSlice";
import axios from "axios";

const ConsultingForm = () => {
  const [formData, setFormData] = useState({
    specialty: "",
    name: "",
    healthQuery: "",
    symptoms: "",
    appointmentDate: ""
  });
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.consulting);
  const { user } = useSelector((state) => state.auth);

   // Get userId from Redux auth state
   const userId = user?._id || user?.userid || user?.userid || user?.userId; // Check for any format the user id is saved


   //console userId for debugging
   useEffect(() => {
    console.log("Current userId:", userId);
   }, [userId]);
   
     // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //submit form data with userId
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      // alert("You must be logged in to book an appointment.");
      setErrorMessage("You must be logged in to book an appointment.");
      return;
    }
    const dataToSubmit = { ...formData, userId };
    try {
      dispatch(ConsultingRequest(dataToSubmit)).unwrap();
      alert("Appointment Successfully booked, Check your email for confirmation within 24hours.");
      setSuccessMessage("Appointment Successfully booked!");
      setErrorMessage("")
      console.log("Submitted data:", dataToSubmit);

      setFormData({
        specialty: "",
        name: "",
        healthQuery: "",
        symptoms: "",
        appointmentDate: "",
      });
    } catch (err) {
      console.error("Error Submitting form:", err);
      alert("Failed to book the appointment. Please try again.");
      setSuccessMessage("");
    }
  };

   // Fetch specialties on component mount
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/specialties");
        setSpecialties(response.data);
      } catch (error) {
        console.error("Error fetching specialties:", error);
        setErrorMessage("Failed to load specialties");
      }
    };

    fetchSpecialties();
  }, []);

   // Fetch doctors when specialty changes
  useEffect(() => {
    const fetchDoctors = async () => {
      if (formData.specialty) {
        try {
          const response = await axios.get(`http://localhost:5000/api/doctors/${formData.specialty}`);
          setDoctors(response.data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setErrorMessage("Failed to load doctors.");
        }
      }
    };

    fetchDoctors();
  }, [formData.specialty]);

  

  return (
    <div className="max-w-lg mx-auto p-4 bg-white">
      <h4 className="text-xl font-semibold mb-4">Talk to a Virtual Specialist</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <select
            name="specialty"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.specialty}
            onChange={handleChange}
          >
            <option value="">Select a specialty</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Choose a Specialist</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <textarea
            name="healthQuery"
            placeholder="Enter Your Health Query"
            className="w-full border border-gray-300 rounded p-2"
            rows="3"
            value={formData.healthQuery}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <textarea
            name="symptoms"
            placeholder="Enter Symptoms (Kindly enter more than one symptom)"
            className="w-full border border-gray-300 rounded p-2"
            rows="3"
            value={formData.symptoms}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="appointmentDate" className="text-left mb-2">
            Appointment Date and Time:
          </label>
          <input
            type="datetime-local"
            id="appointmentDate"
            name="appointmentDate"
            className="w-full border border-gray-300 rounded p-2"
            value={formData.appointmentDate}
            onChange={handleChange}
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {errorMessage && (
          <p className="mt-2 text-red-500">{errorMessage}</p>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </form>
    </div>
  );
};

export default ConsultingForm;