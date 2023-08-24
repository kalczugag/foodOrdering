import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOneProduct = createAsyncThunk(
    "products/fetchOne",
    async (prodId) => {
        const response = await axios.get(`/api/products?_id=${prodId}`);

        return response.data;
    }
);
