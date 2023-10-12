import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editPost = createAsyncThunk("posts/edit", async (post) => {
    const response = await axios.put("/api/posts", {
        ...post[0],
        img: post[1],
    });

    return response.data;
});
