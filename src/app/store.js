import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import consultingReducer from '../features/ConsultingSlice';
import doctorReducer from '../features/doctorSlice';
import symptomReducer from '../features/symptomSlice';
import { combineReducers } from 'redux';
import noteReducer from '../features/noteSlice';


// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    consulting: consultingReducer,
    doctors: doctorReducer,
    symptom: symptomReducer,
    note: noteReducer,
});

// Configure store
const store = configureStore({
    reducer: rootReducer,
       
});

export default store;
