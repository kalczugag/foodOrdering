import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useThunk } from "./hooks/use-thunk";
import { fetchUser } from "./store";
import Header from "./components/Header";
import Home from "./pages/homepage/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Menu from "./pages/Menu";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

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
                    <Route index element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
