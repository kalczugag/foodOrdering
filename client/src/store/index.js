import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { cartReducer } from "./slices/cartSlice";
import { productsReducer } from "./slices/productsSlice";
import { ordersReducer } from "./slices/OrdersSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productsReducer,
        orders: ordersReducer,
    },
});

export * from "./slices/cartSlice";
export * from "./thunks/fetchUser";
export * from "./thunks/handlePayment";
export * from "./thunks/adminLogin";
export * from "./thunks/fetchProducts";
export * from "./thunks/addProduct";
export * from "./thunks/fetchOrders";
