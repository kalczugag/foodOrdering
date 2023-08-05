import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../thunks/fetchUser";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.data = action.payload || false;
        });
    },
});

export const authReducer = authSlice.reducer;
