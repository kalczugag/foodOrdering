import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";
import "./utils/styles/globalStyles.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { fetchCart, fetchUser } from "./store";
import { useUser } from "./hooks/use-user";
import { useThunk } from "./hooks/use-thunk";
import SimpleBar from "simplebar-react";
import HomeFooter from "./pages/homepage/HomeFooter";
import HomePage from "./pages/homepage/HomePage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/EventsPage";
import CartPage from "./pages/CartPage";
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
import AdminMain from "./components/AdminMain";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminEvents from "./pages/admin/AdminEvents";
import BlogEdit from "./pages/BlogEdit";

const App = () => {
    const scrollableNodeRef = useRef();
    const location = useLocation();

    const [doFetchUser, isLoadingUser] = useThunk(fetchUser);
    const [doFetchCart, isLoadingCart] = useThunk(fetchCart);

    const { user } = useUser;
    const cart = useSelector((state) => state.cart.items);

    useEffect(() => {
        scrollableNodeRef.current.scrollTop = 0;
    }, [location]);

    useEffect(() => {
        if (!user && !isLoadingUser && cart.length <= 0 && !isLoadingCart) {
            const fetchData = async () => {
                await doFetchUser();
                doFetchCart();
            };
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchUser, doFetchCart, user, cart]);

    return (
        <SimpleBar
            scrollableNodeProps={{ ref: scrollableNodeRef }}
            style={{ height: "100vh" }}
        >
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

                    <Route path="/profile" element={<ProfilePage />}>
                        <Route path="" element={<ProfileDetails />} />
                        <Route path="history" element={<ProfilePayments />} />
                    </Route>
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<DashboardAdmin />}>
                        <Route path="" element={<AdminMain />} />
                        <Route path="/admin/blog" element={<AdminBlog />} />
                        <Route
                            path="/admin/blog/edit/:postId"
                            element={<BlogEdit />}
                        />
                        <Route path="/admin/events" element={<AdminEvents />} />
                    </Route>
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
        </SimpleBar>
    );
};

export default App;
