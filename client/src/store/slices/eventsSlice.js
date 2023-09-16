import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents } from "../thunks/fetchEvents";

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchEvents.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchEvents.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const eventsReducer = eventsSlice.reducer;
