import { createSlice } from "@reduxjs/toolkit";

const usersSlice =  createSlice({
    name: "users",
    initialState: { currentUser: null},
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        }, 
         
        logout: (state) => {
            state.currentUser = null;
        }
    }
});
export const { login , logout} = usersSlice.actions;

export default usersSlice.reducer;