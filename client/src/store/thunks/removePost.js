import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removePost = createAsyncThunk("posts/remove", async (item) => {
    if (item.img) {
        await axios.delete(`/api/image/${encodeURIComponent(item.img)}`);
    }

    await axios.delete(`/api/posts/${item._id}`);

    return item;
});
