import { createSlice } from "@reduxjs/toolkit";

//item model: { image: img, name: string, extras: [string], price: number, count: {type: number, dufault: 1} }
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        itemsCount: 0,
        discount: 0, //in fraction (fe.: 0.2)
        subtotal: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
                state.totalPrice += newItem.price;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
                state.totalPrice += newItem.price;
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

        changeItemsAmount(state, action) {
            const { id, amount } = action.payload;
            const item = state.items.find((item) => item.id === id);

            if (item) {
                if (amount === -1 && item.count === 1) {
                    return;
                }

                const newCount = item.quantity + amount;
                item.quantity = newCount > 0 ? newCount : 0;
                state.itemsCount += amount;
                state.totalPrice += item.price * amount;
            }

            state.subtotal = state.totalPrice;
        },
    },

    AddDiscount(state, action) {
        state.totalPrice = state.totalPrice * state.discount;
    },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, changeItemsAmount, AddDiscount } =
    cartSlice.actions;
