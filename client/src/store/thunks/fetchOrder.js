import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrder = createAsyncThunk("orders/fetch", async (orderId) => {
    const response = await axios.get(`/api/orders/${orderId}`);

    return response.data;
});
