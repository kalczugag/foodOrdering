import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
    const response = await axios.get("/api/cart");

    console.log(response.data);
    return response.data;
});
