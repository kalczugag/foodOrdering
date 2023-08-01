import { createSlice } from "@reduxjs/toolkit";

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
            console.log(newItem);
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
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
                (item) => item.id === action.payload.id
            );

            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
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
});

export const cartReducer = cartSlice.reducer;
export const {
    addToCart,
    removeFromCart,
    changeItemsAmount,
    addDiscount,
    changeDiscountCode,
} = cartSlice.actions;
