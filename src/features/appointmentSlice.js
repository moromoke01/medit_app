import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user appointments
export const fetchAppointments = createAsyncThunk(
  "appointments/fetch",
  async (userId) => {
    const response = await axios.get(`/api/appointments?userId=${userId}`);
    return response.data;
  }
);

// Book an appointment
export const bookAppointment = createAsyncThunk(
  "appointments/book",
  async (appointmentData) => {
    const response = await axios.post("/api/appointments", appointmentData);
    return response.data;
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default appointmentsSlice.reducer;
