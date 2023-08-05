import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProductToCart = createAsyncThunk(
    "products/add",
    async (prod) => {
        const response = await axios.post("/api/products", prod);

        return response.data;
    }
);
