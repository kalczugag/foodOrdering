import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetch", async () => {
    const response = await axios.get("/api/current_user");

    return response.data;
});
