import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addEvent = createAsyncThunk("events/add", async (event) => {
    const response = await axios.post("/api/events", {
        ...event[0],
        img: event[1],
    });

    return response.data;
});
