import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { cartReducer } from "./slices/cartSlice";
import { productsReducer } from "./slices/productsSlice";
import { ordersReducer } from "./slices/OrdersSlice";
import { billingReducer } from "./slices/billingSlice";
import { eventsReducer } from "./slices/eventsSlice";
import { blogReducer } from "./slices/blogSlice";
import { discountReducer } from "./slices/discountSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        discount: discountReducer,
        products: productsReducer,
        orders: ordersReducer,
        billing: billingReducer,
        events: eventsReducer,
        blog: blogReducer,
    },
});

export * from "./slices/cartSlice";
export * from "./thunks/fetchUser";
export * from "./thunks/fetchPost";
export * from "./thunks/fetchPosts";
export * from "./thunks/fetchProduct";
export * from "./thunks/fetchProducts";
export * from "./thunks/fetchOrder";
export * from "./thunks/fetchOrders";
export * from "./thunks/fetchEvents";
export * from "./thunks/fetchCart";
export * from "./thunks/fetchDiscounts";
export * from "./thunks/addProduct";
export * from "./thunks/addToCart";
export * from "./thunks/addPost";
export * from "./thunks/addEvent";
export * from "./thunks/addDiscount";
export * from "./thunks/editUser";
export * from "./thunks/editProduct";
export * from "./thunks/editEvent";
export * from "./thunks/editPost";
export * from "./thunks/removeProduct";
export * from "./thunks/removeFromCart";
export * from "./thunks/removeEvent";
export * from "./thunks/removePost";
export * from "./thunks/adminLogin";
export * from "./thunks/orderStatusChange";
export * from "./thunks/handlePayment";
export * from "./thunks/checkDiscount";
