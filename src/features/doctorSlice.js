import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://healthconsultbackend.onrender.com/api";


//fetch specialities
export const fetchSpecialties = createAsyncThunk('doctor/fetchSpecialities', async(_, { rejectWithValue}) => {
    try{
        const response = await axios.get(`${API_URL}/specialties`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "failed to load specialties")
    }
})

//fetch doctor by specialty
export const fetchDoctorsBySpecialty = createAsyncThunk('doctors/fetchDoctorBySpecialty', async (specialty, {rejectWithValue}) => {
    try{
        const response = await axios.get(`${API_URL}/doctors/${specialty}`);
        return response.data;
    } catch (error){
        return rejectWithValue(error.response?.data || 'Failed to load doctors');
    }
})

//fetch all doctors
export const fetchAllDoctors = createAsyncThunk('doctors/fetchAllDoctors', async(_, {rejectWithValue})=> {
    try{
        const response = await axios.get(`${API_URL}/getAllDoctors`);
        return response.data;
    } catch(error){
        return rejectWithValue(error.response?.data || "Failed fetching all Doctors")
    }
})

//update doctor data

//delete doctor


const doctorSlice = createSlice({
    name: "doctors",
    initialState: {
        specialties: [],
        doctors: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(fetchSpecialties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.loading = false;
        state.specialties = action.payload;
      })
      .addCase(fetchSpecialties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDoctorsBySpecialty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsBySpecialty.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsBySpecialty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllDoctors.pending, (state)=> {
        state.loading =true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action)=> {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action)=> {
        state.loading =false;
        state.error = action.payload;
      })
      ;
    }
})

export default doctorSlice.reducer;