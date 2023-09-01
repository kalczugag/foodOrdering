import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrder = createAsyncThunk("order/fetch", async (orderId) => {
    const response = await axios.get(`/api/orders/${orderId}`);

    return response.data;
});
