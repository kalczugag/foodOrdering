import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents } from "../thunks/fetchEvents";
import { addEvent } from "../thunks/addEvent";

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

        builder.addCase(addEvent.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const eventsReducer = eventsSlice.reducer;
