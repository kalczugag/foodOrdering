import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "../thunks/fetchCart";
import { addToCart } from "../thunks/addToCart";
import { removeFromCart } from "../thunks/removeFromCart";

//item model: { image: img, name: string, extras: [string], price: number, count: {type: number, dufault: 1} }
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        itemsCount: 0,
        discount: 0, //in fraction (fe.: 0.2)
        discountCode: "",
        subtotal: 0,
        totalPrice: 0,
    },
    reducers: {
        addDiscount(state, action) {
            state.discount = action.payload;
            state.totalPrice -= state.totalPrice * state.discount;
        },

        changeDiscountCode(state, action) {
            state.discountCode = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.isLoading = false;
            const productsData = action.payload.products;

            productsData.forEach((newItem) => {
                const existingItem = state.items.find(
                    (item) =>
                        item._id === newItem._id && item.size === newItem.size
                );

                if (existingItem) {
                    existingItem.quantity += newItem.quantity;
                } else {
                    state.items.push({
                        _id: newItem._id,
                        title: newItem.title,
                        img: newItem.img,
                        size: newItem.size,
                        price: newItem.price,
                        quantity: newItem.quantity,
                    });
                }
                state.totalPrice += newItem.price * newItem.quantity;
                state.subtotal = state.totalPrice;
                state.itemsCount += newItem.quantity;
            });
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addToCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload.products;
            state.itemsCount = 0;
            action.payload.products.forEach((item) => {
                state.itemsCount += item.quantity;
            });
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(removeFromCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = state.items.filter((item) => {
                return item._id !== action.payload._id;
            });
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const cartReducer = cartSlice.reducer;
export const { changeItemsAmount, addDiscount, changeDiscountCode } =
    cartSlice.actions;
