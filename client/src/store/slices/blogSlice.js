import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../thunks/fetchPosts";

const blogSlice = createSlice({
    name: "posts",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const blogReducer = blogSlice.reducer;
