import { createSlice } from "@reduxjs/toolkit";
import { fetchDiscounts } from "../thunks/fetchDiscounts";
import { addDiscount } from "../thunks/addDiscount";
import { removeDiscount } from "../thunks/removeDiscount";

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

        builder.addCase(addDiscount.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addDiscount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addDiscount.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(removeDiscount.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeDiscount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter((discount) => {
                return discount._id !== action.payload;
            });
        });
        builder.addCase(removeDiscount.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const discountReducer = discountSlice.reducer;
