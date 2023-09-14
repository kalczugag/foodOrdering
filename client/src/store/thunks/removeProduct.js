import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeProduct = createAsyncThunk(
    "products/remove",
    async (item) => {
        if (item.img) {
            await axios.delete(`/api/image/${encodeURIComponent(item.img)}`); //delete image from google cloud service
        }

        await axios.post("/api/products/remove", item); //delete all item from db

        return item;
    }
);
