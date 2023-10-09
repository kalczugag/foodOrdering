import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editEvent = createAsyncThunk("events/edit", async (event) => {
    const response = await axios.put("/api/events", {
        ...event,
        title: event.title,
        date: event.date,
        img: event.img,
    });

    return response.data;
});
