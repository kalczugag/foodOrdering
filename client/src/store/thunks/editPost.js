import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editPost = createAsyncThunk("posts/edit", async (post) => {
    const response = await axios.put("/api/events", {
        ...post,
        title: post.title,
        desc: post.desc,
        img: post.img,
    });

    return response.data;
});
