import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeFromCart = createAsyncThunk("cart/remove", async (item) => {
    await axios.delete("/api/cart", item);

    return item;
});
