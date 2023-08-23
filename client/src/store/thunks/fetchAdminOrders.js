import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminOrders = createAsyncThunk("orders/fetch", async () => {
    const response = await axios.get("/api/orders/admin");

    return response.data;
});
