import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


//fetch all doctors
export const fetchDoctors = createAsyncThunk("doctors/fetchAll", async()=>{
    const response = await axios.get("/api/doctors");
    return response.data;
})

//fetch single doctor

//register a new doctor
export const registerDoctor = createAsyncThunk(
    "doctors/register", async(doctorData)=>{
        const response = await axios.post("/api/doctors/register", doctorData);
        return response.data;
    }
)

//update doctor data

//delete doctor


const doctorSlice = createSlice({
    name: "doctors",
    initialState: {
        list: [],
        status: "idle"
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(fetchDoctors.fulfilled, (state, action) => {
            state.list = action.payload;
            state.status = "Success"
           })
           .addCase(fetchDoctors.pending, (state) => {
            state.status = "loading"
           })
           .addCase(fetchDoctors.rejected,  (state)=>{
            state.status = "failed"
           })
           .addCase(registerDoctor.fulfilled, (state, action) => {
            state.list.push(action.payload);
           })
    }
})
export const { reducer: doctorsReducer } = doctorSlice;
export default doctorsReducer;