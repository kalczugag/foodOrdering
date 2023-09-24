import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeEvent = createAsyncThunk("events/remove", async (item) => {
    if (item.img) {
        await axios.delete(`/api/image/${encodeURIComponent(item.img)}`);
    }

    await axios.delete(`/api/events/${item._id}`);

    return item;
});
