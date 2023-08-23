import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const orderStatusChange = createAsyncThunk("orders/edit", async (order) => {
    const response = await axios.put("/api/orders", order);

    return response.data;
});
