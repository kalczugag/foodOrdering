import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../thunks/fetchProducts";
import { addProduct } from "../thunks/addProduct";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        isLoading: false,
        data: null,
        error: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const productsReducer = productsSlice.reducer;
