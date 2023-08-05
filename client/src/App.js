import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useThunk } from "./hooks/use-thunk";
import { fetchUser, fetchProducts, fetchCart } from "./store";
import Header from "./components/Header";
import HomeFooter from "./pages/homepage/HomeFooter";
import HomePage from "./pages/homepage/HomePage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/EventsPage";
import MenuPage from "./pages/MenuPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileDetails from "./components/ProfileDetails";
import ProfilePayments from "./components/ProfilePayments";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import AdminLogin from "./pages/admin/AdminLogin";
import ProductDetailsWrapper from "./pages/ProductDetails";

const App = () => {
    const [doFetchUser] = useThunk(fetchUser);
    const [doFetchProducts] = useThunk(fetchProducts);
    const [doFetchCart] = useThunk(fetchCart);

    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            await doFetchUser();
            doFetchCart();
            if (
                location.pathname === "/" ||
                location.pathname.startsWith("/products")
            ) {
                doFetchProducts();
            }
        };

        fetchData();
    }, [doFetchUser, doFetchProducts, doFetchCart, location.pathname]);

    return (
        <div>
            <Header />
            <div className="mt-20">
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/cart/checkout" element={<CheckoutPage />} />
                    <Route path="/profile" element={<ProfilePage />}>
                        <Route path="" element={<ProfileDetails />} />
                        <Route path="history" element={<ProfilePayments />} />
                    </Route>
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<DashboardAdmin />}></Route>
                    <Route
                        path="/products/:productId"
                        element={<ProductDetailsWrapper />}
                    />
                </Routes>
            </div>
            {!location.pathname.startsWith("/admin") ? <HomeFooter /> : ""}
        </div>
    );
};

export default App;
