import "react-loading-skeleton/dist/skeleton.css";
import "./utils/styles/globalStyles.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomeFooter from "./pages/homepage/HomeFooter";
import HomePage from "./pages/homepage/HomePage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/EventsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import AdminLogin from "./pages/admin/AdminLogin";
import ProductDetails from "./pages/ProductDetails";
import OrderPage from "./pages/OrderPage";
import BlogNew from "./pages/BlogNew";
import Header from "./components/Header";
import ProfileDetails from "./components/ProfileDetails";
import ProfilePayments from "./components/ProfilePayments";
import InvoiceDocumentWrapper from "./components/InvoiceDocument";

const ScrollToTopOnRouteChange = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App = () => {
    const location = useLocation();

    return (
        <div>
            <ScrollToTopOnRouteChange />
            <div
                className={
                    location.pathname.startsWith("/invoice") ? "" : "mt-20"
                }
            >
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/cart/checkout" element={<CheckoutPage />} />
                    <Route path="/profile" element={<ProfilePage />}>
                        <Route path="" element={<ProfileDetails />} />
                        <Route path="history" element={<ProfilePayments />} />
                    </Route>
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<DashboardAdmin />} />
                    <Route
                        path="/products/:productId"
                        element={<ProductDetails />}
                    />
                    <Route path="/orders/:orderId" element={<OrderPage />} />
                    <Route
                        path="/invoice/:orderId"
                        element={<InvoiceDocumentWrapper />}
                    />
                    <Route path="/blog/new" element={<BlogNew />} />
                </Routes>
            </div>
            {!(
                location.pathname.startsWith("/admin") ||
                location.pathname.startsWith("/invoice")
            ) ? (
                <>
                    <HomeFooter />
                </>
            ) : null}
            {!location.pathname.startsWith("/invoice") ? (
                <>
                    <Header />
                </>
            ) : null}
        </div>
    );
};

export default App;
