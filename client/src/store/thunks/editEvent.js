import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editEvent = createAsyncThunk("events/edit", async (event) => {
    console.log(event);

    const response = await axios.put("/api/events", {
        ...event[0],
        img: event[1],
    });

    return response.data;
});
