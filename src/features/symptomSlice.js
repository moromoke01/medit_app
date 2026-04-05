import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "https://healthconsultbackend.onrender.com/api/ai";

export const checkSymptoms = createAsyncThunk(
    'symptoms/checkSymptoms',
    async ({ symptoms, duration, severity}) => {
        const response = await axios.post(`${API_URL}/checkSymptoms`, {
            symptoms,
            duration,
            severity
        });
        return response.data.response;
    }
);

const symptomSlice = createSlice({
    name: 'symptoms',
    initialState: {
        triage: '',
        loading: false,
        error: null
    },
    reducers: {
        clearTriage: (state)=> {
            state.triage = '';
            state.error = null;
      
        },
    },
    extraReducers: (builder)=> {
        builder
        .addCase(checkSymptoms.pending, (state) => {
            state.loading =true;
            state.error = null;
         })
         .addCase(checkSymptoms.fulfilled, (state, action) => {
            state.loading = false;
            state.triage = action.payload;
         })
         .addCase(checkSymptoms.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
    },
})

export const {clearTriage} = symptomSlice.actions;
export default symptomSlice.reducer;