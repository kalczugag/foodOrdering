import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk("products/add", async (prod) => {
    const imageUploadResponse = await axios.post("/api/upload", prod.image, {
        headers: {
            "Content-Type": prod.image.type,
        },
    });

    const imageURI = imageUploadResponse.data;

    const productData = {
        title: prod.title,
        desc: prod.desc,
        img: imageURI,
        price: [prod.smallPrice, prod.mediumPrice, prod.largePrice],
    };

    // Step 3: Add the product with the associated image URL
    const response = await axios.post("/api/products", productData);

    return response.data;
});
