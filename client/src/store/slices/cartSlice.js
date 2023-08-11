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
                        ...newItem,
                    });
                }

                state.totalPrice += newItem.price * newItem.quantity;
                state.itemsCount += newItem.quantity;
            });

            state.subtotal = state.totalPrice;
        });

        builder.addCase(fetchCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addToCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            const products = action.payload.products;
            const updatedItems = products.map((item) => ({
                ...item,
                totalPrice: item.price * item.quantity,
            }));

            const totalPrice = updatedItems.reduce(
                (total, item) => total + item.totalPrice,
                0
            );
            const itemsCount = updatedItems.reduce(
                (count, item) => count + item.quantity,
                0
            );

            return {
                ...state,
                isLoading: false,
                items: updatedItems,
                itemsCount,
                totalPrice,
                subtotal: totalPrice,
            };
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(removeFromCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            const updatedItems = state.items.filter((item) => {
                return item._id !== action.payload._id;
            });

            const totalPrice = updatedItems.reduce(
                (total, item) => total + item.totalPrice,
                0
            );

            const itemsCount = updatedItems.reduce(
                (count, item) => count + item.quantity,
                0
            );

            return {
                ...state,
                isLoading: false,
                items: updatedItems,
                itemsCount,
                totalPrice,
                subtotal: totalPrice,
            };
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const cartReducer = cartSlice.reducer;
export const { addDiscount, changeDiscountCode } = cartSlice.actions;
