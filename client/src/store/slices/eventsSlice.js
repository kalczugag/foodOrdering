import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents } from "../thunks/fetchEvents";
import { addEvent } from "../thunks/addEvent";
import { editEvent } from "../thunks/editEvent";
import { removeEvent } from "../thunks/removeEvent";

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

        builder.addCase(editEvent.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(editEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            const editedEvent = action.payload;

            const index = state.data.findIndex(
                (event) => event._id === editedEvent._id
            );

            if (index !== -1) {
                state.data[index] = {
                    ...state.data[index],
                    title: editedEvent.title,
                    date: editedEvent.date,
                    img: editedEvent.img,
                };
            }
        });
        builder.addCase(editEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(removeEvent.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter((event) => {
                return event._id !== action.payload._id;
            });
        });
        builder.addCase(removeEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const eventsReducer = eventsSlice.reducer;
