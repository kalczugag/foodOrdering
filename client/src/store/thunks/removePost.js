import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removePost = createAsyncThunk("posts/remove", async (item) => {
    await axios.delete(`/api/posts/${item._id}`);

    return item;
});
