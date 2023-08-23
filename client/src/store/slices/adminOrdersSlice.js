import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminOrders } from "../thunks/fetchAdminOrders";
import { orderStatusChange } from "../thunks/orderStatusChange";

const adminOrdersSlice = createSlice({
    name: "adminOrders",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchAdminOrders.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAdminOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAdminOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(orderStatusChange.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(orderStatusChange.fulfilled, (state, action) => {
            state.isLoading = false;
            const orderIndex = state.data.findIndex(
                (order) => order._id === action.payload._id
            );
            if (orderIndex !== -1) {
                state.data[orderIndex] = {
                    ...state.data[orderIndex],
                    status: action.payload.status,
                };
            }
        });

        builder.addCase(orderStatusChange.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const adminOrdersReducer = adminOrdersSlice.reducer;
