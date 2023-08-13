import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeProduct = createAsyncThunk(
    "products/remove",
    async (item) => {
        await axios.post("/api/products/remove", item);

        return item;
    }
);
