import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { cartReducer } from "./slices/cartSlice";
import { productsReducer } from "./slices/productsSlice";
import { ordersReducer } from "./slices/OrdersSlice";
import { billingReducer } from "./slices/billingSlice";
import { eventsReducer } from "./slices/eventsSlice";
import { blogReducer } from "./slices/blogSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productsReducer,
        orders: ordersReducer,
        billing: billingReducer,
        events: eventsReducer,
        blog: blogReducer,
    },
});

export * from "./slices/cartSlice";
export * from "./thunks/fetchUser";
export * from "./thunks/editUser";
export * from "./thunks/handlePayment";
export * from "./thunks/adminLogin";
export * from "./thunks/fetchProduct";
export * from "./thunks/fetchProducts";
export * from "./thunks/addProduct";
export * from "./thunks/removeProduct";
export * from "./thunks/editProduct";
export * from "./thunks/fetchOrders";
export * from "./thunks/fetchCart";
export * from "./thunks/addToCart";
export * from "./thunks/removeFromCart";
export * from "./thunks/orderStatusChange";
export * from "./thunks/fetchOrder";
export * from "./thunks/fetchEvents";
export * from "./thunks/addEvent";
export * from "./thunks/fetchPosts";
export * from "./thunks/fetchPost";
