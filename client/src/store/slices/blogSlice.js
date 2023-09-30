import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../thunks/fetchPosts";
import { addPost } from "../thunks/addPost";
import { removePost } from "../thunks/removePost";

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

        builder.addCase(addPost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addPost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(removePost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removePost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter((post) => {
                return post._id !== action.payload._id;
            });
        });
        builder.addCase(removePost.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const blogReducer = blogSlice.reducer;
