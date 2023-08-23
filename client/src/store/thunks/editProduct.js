import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editProduct = createAsyncThunk("products/edit", async (prod) => {
    const response = await axios.put("/api/products", {
        ...prod,
        title: prod.title,
        desc: prod.desc,
        img: prod.imageURI,
        price: [prod.smallPrice, prod.mediumPrice, prod.largePrice],
    });

    return response.data;
});
