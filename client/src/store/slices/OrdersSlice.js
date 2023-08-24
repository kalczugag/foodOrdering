import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "../thunks/fetchOrders";
import { orderStatusChange } from "../thunks/orderStatusChange";

const OrdersSlice = createSlice({
    name: "orders",
    initialState: {
        data: [],
        isLoading: false,
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

        builder.addCase(orderStatusChange.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(orderStatusChange.fulfilled, (state, action) => {
            state.isLoading = false;
            const editedOrder = action.payload;

            const index = state.data.findIndex(
                (item) => item._id === editedOrder._id
            );

            if (index !== -1) {
                state.data[index] = {
                    ...state.data[index],
                    status: editedOrder.status,
                };
            }
        });
        builder.addCase(orderStatusChange.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const ordersReducer = OrdersSlice.reducer;
