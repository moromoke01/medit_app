import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConsultingRequest } from "../../features/ConsultingSlice";
import { fetchSpecialties, fetchDoctorsBySpecialty } from "../../features/doctorSlice";
import axios from "axios";

const ConsultingForm = () => {
  const [formData, setFormData] = useState({
    specialty: "",
    specialistId: "",
    healthQuery: "",
    symptoms: "",
    appointmentDate: ""
  });
  // const [specialties, setSpecialties] = useState([]);
  // const [doctors, setDoctors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [doctorAvailability, setDoctorAvailability] = useState([]);


  const dispatch = useDispatch();
  const { isLoading, error} = useSelector((state) => state.consulting);
  const { user } = useSelector((state) => state.auth);
  const { specialties, doctors, loading: doctorsLoading, error: doctorsError } = useSelector((state) => state.doctors );

  // Get userId from Redux auth state
  const userId = user?._id || user?.userid || user?.userId;

  // Debug userId
  useEffect(() => {
    console.log("Current userId:", userId);
  }, [userId]);

  //dipacthing data fetech
  useEffect(()=> {
    dispatch(fetchSpecialties());
  }, [dispatch])


  useEffect(() => {
    if (formData.specialty){
      dispatch(fetchDoctorsBySpecialty(formData.specialty));
    }
  }, [dispatch, formData.specialty]);

//fetching doctor availability when a specialist is selected
useEffect(() => {
  const fetchAvailability = async ( )=> {
    if (formData.specialistId) {
      try{
        const res = await axios.get(`https://healthconsultbackend.onrender.com/api/availability/${formData.specialistId}`);
        setDoctorAvailability(res.data.bookings);
      } catch (error){
        console.error("Error fetching availability:", error);
      }
  }
};
  fetchAvailability();
}, [formData.specialistId]);



  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleBookingChange = (e) => {
  const { name, value } = e.target;

  if (name === "appointmentDate") {
    if (!value) {
      // No value selected yet, just update state
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    let selectedSlotISO;
    try {
      selectedSlotISO = new Date(value).toISOString();
    } catch {
      console.warn("Invalid date selected:", value);
      setFormData((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    // Check if already booked
    const isBooked = doctorAvailability.some((slot) => {
      if (!slot.appointmentDate) return false;
      try {
        const bookedISO = new Date(slot.appointmentDate).toISOString();
        return bookedISO === selectedSlotISO;
      } catch {
        return false; // skip invalid dates
      }
    });

    if (isBooked) {
      alert("Sorry, this time slot has already been booked. Please choose another time.");
      setFormData((prev) => ({ ...prev, appointmentDate: "" }));
      return;
    }
  }

  setFormData((prev) => ({ ...prev, [name]: value }));
};

  //handling the booking date change
//   const handleBookingChange = (e) => {
//     const {name, value} = e.target;

//     if (name === "appointmentDate"){

//       //check if selected date and time is already booked
//       // const isBooked = doctorAvailability.some( 
//       //   // (slot) => `${slot.date}T${slot.time}` === value
//       //   (slot) => new Date(`${slot.date}T${slot.time}`).toISOString() === new Date(value).toISOString()

//       // );

//        const isBooked = doctorAvailability.some(slot => slot.appointmentDate === value);

//       if (isBooked) {
//         alert("This time slot is already booked. Please choose a different time.");
        
//        setFormData({ ...formData, appointmentDate: "" });
//         return;
//       }
//     }
//  setFormData({ ...formData, [name]: value });
//   }


  // Submit form data with userId
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!userId) {
    setErrorMessage("You must be logged in to book an appointment.");
    return;
  }

  const selectedDoctor = doctors.find(doc => doc._id.toString() === formData.specialistId.toString());
  const specialistName = selectedDoctor ? selectedDoctor.name : "Unknown";

  try {
    const appointmentISO = new Date(formData.appointmentDate).toISOString();

    const response = await axios.post("https://healthconsultbackend.onrender.com/api/availability/bookSlot", {
      patientId: userId,
      doctorId: formData.specialistId,
      specialistName: specialistName,
      appointmentDate: appointmentISO
    });

    if (!response.data.success) {
      setErrorMessage("Failed to book the selected slot. Please choose a different time.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      patientId: userId,
      specialistName: specialistName,
      appointmentDate: appointmentISO
    };

    await dispatch(ConsultingRequest(dataToSubmit)).unwrap();
    alert("Appointment Successfully booked, Check your email for confirmation within 24hours.");

    setFormData({
      specialty: "",
      specialistId: "",
      healthQuery: "",
      symptoms: "",
      appointmentDate: "",
    });

  } catch (err) {
    console.error("Error Submitting form:", err);
    alert("Failed to book the appointment. Please try again.");
  }
};


  

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
            name="specialistId"
            value={formData.specialistId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            disabled={doctorsLoading || !formData.specialty}
          >
            <option value="">Choose a Specialist</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor._id}>
                {doctor.name}
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
            className={`w-full border border-gray-300 rounded p-2 
            ${
              doctorAvailability.some(slot => slot.appointmentDate === formData.appointmentDate ? 'bg-gray-300 cursor-not-allowed' : 'bg-white')
            }`}
            value={formData.appointmentDate}
            onChange={handleBookingChange }
            disabled= {doctorAvailability.some(slot => slot.appointmentDate === formData.appointmentDate)}
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
        {doctorsError && <p className="text-red-500 mt-2">{doctorsError}</p>}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </form>
    </div>
  );
};

export default ConsultingForm;