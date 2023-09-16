import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk("products/add", async (prod) => {
    const formData = new FormData();
    formData.append("imgfile", prod[1]);

    const imageUploadResponse = await axios.post("/api/image", formData);

    const productData = {
        title: prod[0].title,
        desc: prod[0].desc,
        img: imageUploadResponse.data.imageUrl,
        price: [prod[0].smallPrice, prod[0].mediumPrice, prod[0].largePrice],
    };

    const response = await axios.post("/api/products", productData);

    return response.data;
});
