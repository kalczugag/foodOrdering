import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editUser = createAsyncThunk("user/edit", async (user) => {
    const response = await axios.put("/api/current_user", user);

    return response.data;
});
