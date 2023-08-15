import { AiOutlinePhone } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { useUser } from "../hooks/use-user";
import { Link } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { fetchCart, fetchUser, fetchProducts } from "../store";
import CartIcon from "./CartIcon";
import { useEffect } from "react";

const Header = () => {
    const user = useUser();
    const [doFetchCart] = useThunk(fetchCart);
    const [doFetchUser] = useThunk(fetchUser);
    const [doFetchProducts] = useThunk(fetchProducts);

    useEffect(() => {
        const fetchData = async () => {
            await doFetchUser();
            doFetchProducts();
            doFetchCart();
        };
        fetchData();
    }, [doFetchCart, doFetchUser, doFetchProducts]);

    const config = [
        { label: "Homepage", name: "home", scrollTo: 0 },
        {
            label: "Products",
            name: "products",
            scrollTo: window.innerHeight - 74,
        },
        { label: "Menu", name: "menu", scrollTo: window.innerHeight - 74 },
        {
            label: <img src={require("../utils/images/logo.png")} alt="logo" />,
            name: "",
            className: "w-28",
            scrollTo: 0,
        },
        {
            label: "Events",
            name: "events",
            scrollTo: document.body.scrollHeight,
        },
        { label: "Blog", name: "blog", scrollTo: document.body.scrollHeight },
        {
            label: "Contact",
            name: "contact",
            scrollTo: document.body.scrollHeight,
        },
    ];

    const renderedLinks = config.map(
        ({ label, name, className, scrollTo }, index) => {
            const handleScrollTo = (targetHeight) => {
                window.scrollTo({
                    top: targetHeight,
                    behavior: "smooth",
                });
            };

            return (
                <a
                    key={index}
                    href={name === "" ? "/" : "#"}
                    onClick={() => handleScrollTo(scrollTo)}
                    className={`hover:text-gray-100 ${className}`}
                >
                    {label}
                </a>
            );
        }
    );

    const userHeaderOptions = (
        <>
            <Link to="/profile">
                <GoPerson />
            </Link>
            <a href="/api/logout">
                <FiLogOut />
            </a>
        </>
    );

    return (
        <div className="fixed left-0 right-0 top-0 z-20 flex flex-row justify-between text-white bg-red-main p-4 h-20 md:px-8">
            <div className="flex flex-row items-center flex-1 space-x-3">
                <AiOutlinePhone className="text-5xl bg-white text-red-main p-1 rounded-full sm:block md:hidden xl:block" />
                <div className="flex-col sm:block md:hidden xl:block">
                    <p className="text-xs">ORDER NOW</p>
                    <p className="font-bold">012 345 678</p>
                </div>
            </div>
            <div className="hidden flex-row items-center justify-between space-x-6 md:flex">
                {renderedLinks}
            </div>
            <div className="flex items-center justify-end flex-1 text-3xl space-x-5 md:ml-4">
                <CartIcon />
                {!user && (
                    <a
                        href="/auth/google"
                        className="text-2xl border p-2 px-4 hover:bg-red-500"
                    >
                        login
                    </a>
                )}
                {user && userHeaderOptions}
            </div>
        </div>
    );
};

export default Header;
