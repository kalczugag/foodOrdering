import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
    const response = await axios.get("/api/cart");

    return response.data;
});
