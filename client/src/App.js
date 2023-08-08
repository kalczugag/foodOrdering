import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useThunk } from "./hooks/use-thunk";
import { fetchProducts } from "./store";
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

const ScrollToTopOnRouteChange = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App = () => {
    const [doFetchProducts] = useThunk(fetchProducts);

    const location = useLocation();

    useEffect(() => {
        if (
            location.pathname === "/" ||
            location.pathname.startsWith("/products")
        ) {
            doFetchProducts();
        }
    }, [doFetchProducts, location.pathname]);

    return (
        <div>
            <ScrollToTopOnRouteChange />
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
