import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDiscounts = createAsyncThunk("discount/fetch", async () => {
    const response = await axios.get("/api/discount");

    return response.data;
});
