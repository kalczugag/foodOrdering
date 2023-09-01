import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "../thunks/fetchOrders";
import { fetchOrder } from "../thunks/fetchOrder";
import { orderStatusChange } from "../thunks/orderStatusChange";

const OrdersSlice = createSlice({
    name: "orders",
    initialState: {
        data: [],
        dataAdmin: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchOrders.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.isLoading = false;

            if (action.payload.admin) {
                state.dataAdmin = action.payload.orders;
            } else {
                state.data = action.payload.orders;
            }
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(fetchOrder.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(orderStatusChange.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(orderStatusChange.fulfilled, (state, action) => {
            state.isLoading = false;
            const editedOrder = action.payload;

            const index = state.dataAdmin.findIndex(
                (item) => item._id === editedOrder._id
            );

            if (index !== -1) {
                state.dataAdmin[index] = {
                    ...state.dataAdmin[index],
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
