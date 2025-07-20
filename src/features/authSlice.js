import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000/api";

// Helper function to decode and store user data
const decodeAndStoreUser = (token) => {
  const user = jwtDecode(token);
  Cookies.set("token", token, { expires: 7, path: "/" });
  Cookies.set("user", JSON.stringify(user), { expires: 7, path: "/" });
  return user;
};


// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const token = response.data.token;
      const user = jwtDecode(token);
      
      // Debug logs
      console.log("Decoded JWT user:", user);
      
      // Check for all possible ID fields (userId, userid, _id)
      if (!user?.userId && !user?.userid && !user?._id) {
        throw new Error("Token missing user identifier");
      }

      // Normalize the user ID field
      const normalizedUser = {
        ...user,
        _id: user.userId || user.userid || user._id  // Standardize to _id
      };

      Cookies.set("token", token, { expires: 7, path: "/" });
      Cookies.set("user", JSON.stringify(normalizedUser), { expires: 7, path: "/" });
      
      return { user: normalizedUser, token };
    } catch (error) {
      console.error("Login error:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Login failed"
      );
    }
  }
);


// Signup Doctor
export const registerDoctor = createAsyncThunk(
  "auth/registerDoctor",
  async (doctorData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        fname: doctorData.fname || "",
        lname: doctorData.lname || "",
        contact: doctorData.contact || "",
        email: doctorData.email || "",
        password: doctorData.password || "",
        role: doctorData.role || "doctor",
        additionalData: {
          licenseNumber: doctorData.licenseNumber || "",
          specialty: doctorData.specialty || "",
          experience: doctorData.experience || "",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Doctor registration failed"
      );
    }
  }
);

// Signup Patient
export const registerPatient = createAsyncThunk(
  "auth/registerPatient",
  async (patientData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        fname: patientData.fname || "",
        lname: patientData.lname || "",
        contact: patientData.contact || "",
        email: patientData.email || "",
        password: patientData.password || "",
        role: patientData.role || "patient",
        additionalData: {
          genotype: patientData.genotype || "",
          bloodGroup: patientData.bloodGroup || "",
          medicalHistory: patientData.medicalHistory || "",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Patient registration failed"
      );
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (otpData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/verifyOTP`, otpData);
      return response.data; 
      // console.log("Backend Response:", response.data);
      // const token = response.data.token;
      // const user = decodeAndStoreUser(token); // Decode and store user
      // return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "OTP verification failed"
      );
    }
  }
);

// Load initial state from cookies
const loadInitialState = () => {
  const token = Cookies.get("token");
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  return { user, token, isLoading: false, error: null };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      decodeAndStoreUser(action.payload.token); // Store in cookies
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Doctor
      .addCase(registerDoctor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register Patient
      .addCase(registerPatient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;