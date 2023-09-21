import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPost = createAsyncThunk("post/fetch", async (postId) => {
    const response = await axios.get(`/api/posts/${postId}`);

    return response.data;
});
