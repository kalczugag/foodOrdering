import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../thunks/fetchProducts";
import { addProduct } from "../thunks/addProduct";
import { removeProduct } from "../thunks/removeProduct";
import { editProduct } from "../thunks/editProduct";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        isLoading: false,
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

        builder.addCase(editProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            const editedProduct = action.payload;

            console.log(editedProduct);

            const index = state.data.findIndex(
                (item) => item._id === editedProduct._id
            );

            if (index !== -1) {
                state.data[index] = {
                    ...state.data[index],
                    title: editedProduct.title,
                    desc: editedProduct.desc,
                    img: editedProduct.img,
                    blurhash: editProduct.blurhash,
                    price: editedProduct.price,
                    extraOptions: editedProduct.extraOptions,
                };
            }
        });

        builder.addCase(editProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(removeProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter((item) => {
                return item._id !== action.payload._id;
            });
        });
        builder.addCase(removeProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const productsReducer = productsSlice.reducer;
