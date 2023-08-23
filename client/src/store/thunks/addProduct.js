import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk("products/add", async (prod) => {
    const response = await axios.post("/api/products", {
        title: prod.title,
        desc: prod.desc,
        img: prod.imageURI,
        price: [prod.smallPrice, prod.mediumPrice, prod.largePrice],
    });

    console.log(response.data);
    return response.data;
});
