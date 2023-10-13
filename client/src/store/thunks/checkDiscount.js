import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkDiscount = createAsyncThunk(
    "discount/check",
    async (discount) => {
        const response = await axios.get("/api/discount/check", {
            params: {
                code: discount,
            },
        });

        return response.data;
    }
);
