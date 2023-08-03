import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const handlePayment = createAsyncThunk("payment", async (items) => {
    const response = await axios.post("/api/stripe", items);

    return response.data;
});
