import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
    const response = await axios.get("/api/orders");

    return response.data;
});
