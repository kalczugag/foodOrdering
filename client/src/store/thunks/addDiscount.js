import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addDiscount = createAsyncThunk(
    "discount/add",
    async (discount) => {
        const response = await axios.post("/api/discount", discount);

        return response.data;
    }
);
