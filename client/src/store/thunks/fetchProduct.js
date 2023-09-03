import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
    "product/fetch",
    async (prodId) => {
        const response = await axios.get(`/api/products/${prodId}`);

        return response.data;
    }
);
