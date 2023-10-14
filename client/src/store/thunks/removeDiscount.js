import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeDiscount = createAsyncThunk(
    "discount/remove",
    async (discount) => {
        await axios.delete(`/api/discount/${discount}`);

        return discount;
    }
);
