import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
    const response = await axios.get("/api/events");

    return response.data;
});
