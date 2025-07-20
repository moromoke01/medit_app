import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerDoctor, registerPatient, verifyOTP } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signupform = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    contact: "",
    role: "patient"
  });

  const [step, setStep] = useState(1);
  const [additionalData, setAdditionalData] = useState({
    genotype: "",
    bloodGroup: "",
    medicalHistory: "",
    licenseNumber: "",
    specialty: "",
    experience: ""
  });

  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userId, setUserId] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdditionalChange = (e) => {
    setAdditionalData({
      ...additionalData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;

    //step 1: Register user and send OTP
    if(!isOtpSent){
    if (formData.role === "doctor") {
      result = await dispatch(registerDoctor({ ...formData, ...additionalData }));
    } else {
      result = await dispatch(registerPatient({ ...formData, ...additionalData }));
    }
    if (result.meta.requestStatus === "fulfilled") {
      alert("OTP sent to your email. Please verify");
      setIsOtpSent(true);

      // Extract userId from the response
      const userId = result.payload.user?._id; // Access the _id field inside the user object
      if (!userId) {
        console.error("User ID is missing in the response:", result.payload);
        alert("An error occurred. Please try again.");
        return;
      }

      setUserId(userId);
      console.log("OTP sent successfully", result.payload);
      console.log("user id", result.payload.user?._id);
      setStep(3);
      
    } else {
      alert("Registration failed. Please try again.");
    }
  }
 };

 const handleOtpVerification = async (e) => {
  e.preventDefault();

  // Step 2: Verify OTP
  const otpData = {
      userId: userId,
      otp: otp,
      userType: formData.role === "doctor" ? "Doctor" : "Patient", // Include userType
  };

  const result = await dispatch(verifyOTP(otpData));
  if (result.meta.requestStatus === "fulfilled" && result.payload.status === "SUCCESS") {
      alert(result.payload.message || "OTP verified successfully. Registration complete");
      console.log("Successfully Registered", result.payload);
      navigate("/login");
  } else {
    alert(result.payload?.message || "OTP verification failed. Please try again");
    console.error("Error in OTP verification:", result.payload || result.error);
  }
};



  return (
    <div className="w-full mx-auto items-center">
      <p className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Create an Account</p>
      <div>
    <form onSubmit={isOtpSent ? handleOtpVerification : handleSubmit } className="mr-4">
      {step === 1 && (
        <>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <button
            type="button"
            onClick={handleNext}
            className="p-2 bg-blue-500 text-white rounded w-full"
          >
            Next
          </button>

          <p className="text-center text-sm text-gray-600">
                      Already have an account?{" "}
                      <span className="text-blue-600 hover:underline cursor-pointer">
                        <Link to="/login">Login</Link>
                        </span>
                    </p>
        </>
      )}

      {step === 2 && formData.role === "doctor" && (
        <>
          <input
            type="text"
            name="licenseNumber"
            value={additionalData.licenseNumber}
            onChange={handleAdditionalChange}
            placeholder="License Number"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="specialty"
            value={additionalData.specialty}
            onChange={handleAdditionalChange}
            placeholder="Specialty"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="experience"
            value={additionalData.experience}
            onChange={handleAdditionalChange}
            placeholder="Experience"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <button
            type="button"
            onClick={handlePrevious}
            className="p-2 bg-gray-500 text-white rounded w-full"
          >
            Back
          </button>
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded w-full"
          >
            Submit
          </button>

        </>
      )}

      {step === 2 && formData.role === "patient" && (
        <>
          <input
            type="text"
            name="genotype"
            value={additionalData.genotype}
            onChange={handleAdditionalChange}
            placeholder="Genotype"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="bloodGroup"
            value={additionalData.bloodGroup}
            onChange={handleAdditionalChange}
            placeholder="Blood Group"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="medicalHistory"
            value={additionalData.medicalHistory}
            onChange={handleAdditionalChange}
            placeholder="Medical History"
            className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <div>
          <button
            type="button"
            onClick={handlePrevious}
            className="p-2 bg-gray-500 text-white rounded w-full"
          >
            Back
          </button>
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded w-full"
          >
            Submit
          </button>
          </div>
          
        </>
      )}

      {step === 3 && isOtpSent && (
        <>
          <p className="text-center text-gray-600 mb-4">
            Enter the OTP sent to your email to complete registration
          </p>
          <input 
           type="text"
           value={otp}
           onChange={ (e) => setOtp(e.target.value)}
           placeholder ="Enter OTP"
           className="p-2 mb-4 border border-gray-300 rounded w-full"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded ">
            Verify OTP
          </button>

        </>
      )}
    </form>
    </div>
    </div>
  );
};

export default Signupform;
