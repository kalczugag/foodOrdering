import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeEvent = createAsyncThunk("events/remove", async (item) => {
    await axios.delete(`/api/events/${item._id}`);

    return item;
});
