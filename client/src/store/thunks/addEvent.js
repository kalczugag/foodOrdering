import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addEvent = createAsyncThunk("events/add", async (event) => {
    const formData = new FormData();
    formData.append("imgfile", event[1]);

    const imageUploadResponse = await axios.post("/api/image", formData);

    const response = await axios.post("/api/events", {
        ...event[0],
        img: imageUploadResponse.data.imageUrl,
    });

    return response.data;
});
