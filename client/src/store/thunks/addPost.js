import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addPost = createAsyncThunk("posts/add", async (post) => {
    const formData = new FormData();
    formData.append("imgfile", post[1]);

    const imageUploadResponse = await axios.post("/api/image", formData);

    const response = await axios.post("/api/posts", {
        ...post[0],
        img: imageUploadResponse.data.imageUrl,
    });

    return response.data;
});
