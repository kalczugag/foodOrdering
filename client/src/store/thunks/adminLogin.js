import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const adminLogin = createAsyncThunk(
    "admin/login",
    async ({ username, password }) => {
        const response = await axios.post("/api/admin", {
            username,
            password,
        });

        return response.data;
    }
);
