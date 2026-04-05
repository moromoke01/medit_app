import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";


const API_URL = "https://healthconsultbackend.onrender.com/api/notes";



//save note
export const saveNote = createAsyncThunk(
    "notes/saveNote", async ({patientId, patientName,healthQuery, rawNote}, {rejectWithValue}) =>{
        try{
            const res = await axios.post(`${API_URL}/patient-notes`, {  
                patientId,
                patientName,
                healthQuery,
                rawNote,    
                
            });
            return res.data;
        } catch (error){
            return rejectWithValue(error.response?.data || "Failed to save note");
        } 
    }
);

//view all notes for a patient
export const fetchNotesForPatient = createAsyncThunk(
    "notes/fetchNotesForPatient", async (patientId, {rejectWithValue}) =>{
        try{
            const res = await axios.get(`${API_URL}/patient/${patientId}`);
            return res.data.notes;
        } catch (error){
            return rejectWithValue(error.response?.data || "Failed to fetch notes");
        }
    }
);

//update note
export const updateNote = createAsyncThunk(
    "notes/updateNote", async ({noteId, updatedContent}, {rejectWithValue}) =>{
        try{
            const res = await axios.put(`${API_URL}/update/${noteId}`, {
                content: updatedContent
            });
            return res.data;
        } catch (error){
            return rejectWithValue(error.response?.data || "Failed to update note");
        }
    }
);

//delete note
export const deleteNote = createAsyncThunk(
    "notes/deleteNote", async (noteId, {rejectWithValue}) =>{
        try{
            const res = await axios.delete(`${API_URL}/delete/${noteId}`);
            return res.data;
        } catch (error){
            return rejectWithValue(error.response?.data || "Failed to delete note");
        }
    }
);


const noteSlice = createSlice({
    name: "note",
    initialState: {
        loading: false,
        error: null,
        success: false,
        notes: []

    },
    reducers: {
        clearSaveStatus: (state)=>{
            state.success = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(saveNote.pending, (state) => {
            state.loading = true;   
            state.error = null;
            state.success = false;
        })
        .addCase(saveNote.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.notes.push(action.payload);
            state.error = null;
        })
        .addCase(saveNote.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.error || action.error.message;;
            state.success = false;
        })

        //view all notes for a patient
        .addCase(fetchNotesForPatient.pending, (state) => {
            state.loading = true;   
            state.error = null;
        })
        .addCase(fetchNotesForPatient.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchNotesForPatient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //update note
        .addCase(updateNote.pending, (state)=> {
            state.loading = true;
            state.error = null
        })
        .addCase(updateNote.fulfilled, (state, action)=> {
            state.loading = false;
            state.error = null;
            state.updateNote = action.payload;
        })
        .addCase(updateNote.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload?.error || action.error.message;;
            state.success = false;
        })

        //delete note
        .addCase(deleteNote.pending, (state)=> {
            state.loading = true;
            state.error = null
        })
        .addCase(deleteNote.fulfilled, (state)=> {
            state.loading = false;
            state.error = null;
            state.deleteNote = action.payload;
        })
        .addCase(deleteNote.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload?.error || action.error.message;;
            state.success = false;
        })
    }
});

export const { clearSaveStatus } = noteSlice.actions;
export default noteSlice.reducer;