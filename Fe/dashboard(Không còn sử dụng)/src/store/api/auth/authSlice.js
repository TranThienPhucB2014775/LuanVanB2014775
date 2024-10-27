import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

const storedUser = localStorage.getItem("token");

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: storedUser || null,
        isAuth: !!storedUser,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuth = true;
        },
        logOut: (state, action) => {
            state.token = null;
            state.isAuth = false;
        },
    },
});

export const {
    setToken,
    logOut
} = authSlice.actions;
export default authSlice.reducer;
