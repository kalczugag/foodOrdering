import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useThunk } from "./hooks/use-thunk";
import { fetchUser } from "./store";
import Header from "./components/Header";
import HomePage from "./pages/homepage/HomePage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/EventsPage";
import MenuPage from "./pages/MenuPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

const App = () => {
    const [doFetchUser] = useThunk(fetchUser);

    useEffect(() => {
        doFetchUser();
    }, [doFetchUser]);

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
                </Routes>
            </div>
        </div>
    );
};

export default App;
