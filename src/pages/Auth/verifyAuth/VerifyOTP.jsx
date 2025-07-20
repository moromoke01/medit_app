import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { verifyOTP } from "../../../features/authSlice"


const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const {user} =useSelector((state) => state.auth);


  const handleChange = (e) =>{
    setOtp(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User information is missing. Please log in again.");
      return;
    }

    const otpData = {
      userId:  user.userId || user.userid || user._id ,
      otp
    };
    const result = await dispatch(verifyOTP(otpData));
    if(result.meta.requestStatus === "fulfilled"){
      console.log("OTP verified successfully");
      alert("OTP verified successfully");
      window.location.href = "/login";
    } else{
      alert("OTP verification failed. Please try again.");
    }
  }


  return (
    <div className="items-center justify-center">
  <p className="font-bold text-2xl"> Verify your account</p>
      <p className="text-gray-500 mt-2">
      Enter OTP sent to your email
      </p>

      <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="mt-4 p-2 border rounded ml-2"
        placeholder="Enter OTP"
        maxLength="6"
        value={otp}
        onChange={handleChange}
      />
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Verify
        </button>
     </form>
    </div>
  )
}

export default VerifyOTP
