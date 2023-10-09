import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../thunks/fetchPosts";
import { addPost } from "../thunks/addPost";
import { editPost } from "../thunks/editPost";
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

        builder.addCase(editPost.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(editPost.fulfilled, (state, action) => {
            state.isLoading = false;
            const editedPost = action.payload;

            const index = state.data.findIndex(
                (post) => post._id === editedPost._id
            );

            if (index !== -1) {
                state.data[index] = {
                    ...state.data[index],
                    title: editedPost.title,
                    desc: editedPost.desc,
                    img: editedPost.img,
                };
            }
        });
        builder.addCase(editPost.rejected, (state, action) => {
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
