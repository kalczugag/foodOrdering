import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProductToCart = createAsyncThunk(
    "products/add",
    async (prod) => {
        const response = await axios.post("/api/cart", prod);

        return response.data;
    }
);
