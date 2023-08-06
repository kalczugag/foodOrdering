import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "../thunks/fetchCart";
import { addProductToCart } from "../thunks/addProductToCart";

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
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item._id === newItem._id
            );

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
                state.totalPrice += newItem.price * action.payload.quantity;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: action.payload.quantity,
                });
                state.totalPrice += newItem.price * action.payload.quantity;
            }
            state.subtotal = state.totalPrice;
            state.itemsCount += action.payload.quantity;
        },

        removeFromCart(state, action) {
            const removedItems = state.items.filter(
                (item) => item._id === action.payload._id
            );

            state.items = state.items.filter(
                (item) => item._id !== action.payload._id
            );
            state.totalPrice -= removedItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
            state.itemsCount -= removedItems.reduce(
                (total, item) => total + item.quantity,
                0
            );

            state.subtotal = state.totalPrice;
        },

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
            state.items = action.payload.products;
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addProductToCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addProductToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addProductToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const cartReducer = cartSlice.reducer;
export const {
    addToCart,
    removeFromCart,
    changeItemsAmount,
    addDiscount,
    changeDiscountCode,
} = cartSlice.actions;
