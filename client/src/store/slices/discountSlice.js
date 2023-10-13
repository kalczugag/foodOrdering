import { createSlice } from "@reduxjs/toolkit";
import { fetchDiscounts } from "../thunks/fetchDiscounts";

const discountSlice = createSlice({
    name: "discount",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchDiscounts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchDiscounts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchDiscounts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const discountReducer = discountSlice.reducer;
