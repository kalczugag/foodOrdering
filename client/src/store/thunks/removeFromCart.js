import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeFromCart = createAsyncThunk("cart/remove", async (item) => {
    await axios.post("/api/cart/remove", item); //post request??

    return item;
});
