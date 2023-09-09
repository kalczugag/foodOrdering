import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadImage = createAsyncThunk("x/x", async (file) => {
    const formData = new FormData();
    formData.append("imgfile", file);

    try {
        const formData = new FormData();
        formData.append("imgfile", file);

        const response = await axios.post("/api/upload", formData);

        return response.data;
    } catch (error) {
        throw error;
    }
});
