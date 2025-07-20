import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, loginSuccess } from "../../../features/authSlice"; // Import loginSuccess
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
  
      // Check if the action was fulfilled
      if (loginUser.fulfilled.match(resultAction)) {
        const result = resultAction.payload; // Extract the payload
        alert("Successfully Logged in");
        dispatch(loginSuccess(result)); // Dispatch loginSuccess with the payload
        navigate(result.role === "patient" ? "/" : "/");
      } else {
        // Handle rejected action
        alert("Login failed. Please check your credentials.");
        console.error("Login failed:", resultAction.error.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full p-4 mx-auto items-center">
      <p className="text-2xl font-bold text-gray-700 mb-6 text-center">Welcome back! Login here</p>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="p-2 mt-1 border border-gray-300 rounded w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              className="p-2 mt-1 border border-gray-300 rounded w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Forgot Password */}
          <div>
            <p className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Loginform;