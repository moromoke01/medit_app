import  {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "http://localhost:5000/api/consultation";

export const ConsultingRequest = createAsyncThunk("consultation/ConsultingRequest", async(formData, {getState, rejectWithValue}) => {
    try{

      const state = getState();
      const token = state.auth.token; // Get token from Redux store
      console.log("Token being sent:", token);
      
      if (!token) {
        // throw new Error("No authentication token found");
        return rejectWithValue({ error: "No authentication token found" });
      }

        const response = await axios.post(`${API_URL}/createConsultationData`, 
            formData,
            {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` // Include the token
                }
              }
        );
        return response.data;
        } catch(error){
            return rejectWithValue({error: error.message});
        }
});

//view all consulting Requests
export const fetchConsultingRequests = createAsyncThunk("consultation/fetchConsultingRequests", async(_, thunkAPI)=>{
    try{
        const response = await axios.get(`${API_URL}/getConsultationData`);
        return response.data;   
    }catch(error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
})

//fetch single consulting request
export const fetchConsultingRequestbyId = createAsyncThunk("consultation/fetchConsultingRequestbyId", async(id, thunkAPI) => {
    try{
        const response = await axios.get(`${API_URL}/consultation/${id}`);
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
});

//update a consulting request
export const updateConsultingRequest = createAsyncThunk("consultation/updateConsultingRequest", async(formData, thunkAPI) => {
    try{
        const response = await axios.put(`${API_URL}/editConsultation/${formData.id}`, formData);
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
});


//delete a consulting request
export const deleteConsultingRequest = createAsyncThunk("consulting/deleteConsultingRequest", async(id, thunkAPI) => {
    try{
        const response = await axios.delete(`${API_URL}/consulting/${id}`);
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue({error: error.message});
    }
});



const consultingSlice = createSlice({
    name: "consulting",
    initialState: {
        consultingRequests: [],
        consultingRequest: null,
        isLoading: false,
        error:null,
    },
    reducerd: {},
    extraReducers: (builder) => {
        builder
         .addCase(ConsultingRequest.pending, (state) => {
            state.isLoading = true;
            state.error = null;
    })
    .addCase(ConsultingRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.consultingRequest = action.payload;
    })
    .addCase(ConsultingRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || action.error.message;
    })


    // fetch single consulting request
    .addCase(fetchConsultingRequestbyId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
     .addCase(fetchConsultingRequestbyId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.consultingRequest = action.payload;
        })
        .addCase(fetchConsultingRequestbyId.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
        })

      // fetch all consulting request
      .addCase(fetchConsultingRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchConsultingRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.consultingRequests = action.payload;
      })
      .addCase(fetchConsultingRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })

      //delete
        .addCase(deleteConsultingRequest.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteConsultingRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.consultingRequests = state.consultingRequests.filter(
                (request) => request._id !== action.payload._id
            );
        })
        .addCase(deleteConsultingRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
        })
    }
});

export default consultingSlice.reducer;