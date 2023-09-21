import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
    const response = await axios.get("/api/posts");

    return response.data;
});
