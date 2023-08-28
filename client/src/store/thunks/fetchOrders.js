import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk("orders/fetch", async (isAdmin) => {
    const response = await axios.get("/api/orders", {
        params: {
            admin: isAdmin,
        },
    });

    return response.data;
});
