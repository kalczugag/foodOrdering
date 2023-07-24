import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "../thunks/fetchOrders";

const OrdersSlice = createSlice({
    name: "orders",
    initialState: {
        isLoading: false,
        data: null,
        error: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchOrders.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const ordersReducer = OrdersSlice.reducer;
