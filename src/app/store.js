import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import consultingReducer from '../features/ConsultingSlice';
import { combineReducers } from 'redux';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    consulting: consultingReducer,
});

// Configure store
const store = configureStore({
    reducer: rootReducer,
});

export default store;
