import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addPost = createAsyncThunk("posts/add", async (post) => {
    const response = await axios.post("/api/posts", {
        ...post[0],
        img: post[1],
    });

    return response.data;
});
