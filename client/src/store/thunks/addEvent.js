import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addEvent = createAsyncThunk("events/add", async (event) => {
    const response = await axios.post("/api/events", {
        title: event.title,
        date: event.date,
        img: event.img,
    });

    return response.data;
});
