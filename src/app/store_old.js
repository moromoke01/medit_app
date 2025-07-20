import {configureStore} from '@reduxjs/toolkit';
// import doctorsReducer from "../features/doctorSlice"
// import appointmentReducer from "../features/appointmentSlice"
// import usersReducer from "../features/userSlice"
import authReducer from "../features/authSlice";
import consultingReducer from "../features/ConsultingSlice";

const store = configureStore({
    reducer:{
        // doctors: doctorsReducer,
        // appointments: appointmentReducer,
        // users: usersReducer,
        auth: authReducer,
        consulting: consultingReducer,
    },
});



export default store;