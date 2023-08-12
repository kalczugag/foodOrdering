import { createSlice } from "@reduxjs/toolkit";
import { handlePayment } from "../thunks/handlePayment";

const billingSlice = createSlice({
    name: "billing",
    initialState: {},
    extraReducers(builder) {
        builder.addCase(handlePayment.fulfilled, (state, action) => {
            window.location.href = action.payload;
        });
    },
});

export const billingReducer = billingSlice.reducer;
