import { AiOutlinePhone } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

const Header = () => {
    const user = useSelector((state) => state.auth.data);

    const config = [
        { label: "Homepage", name: "" },
        { label: "Products", name: "products" },
        { label: "Menu", name: "menu" },
        {
            label: <img src={require("../utils/images/logo.png")} alt="logo" />,
            name: "",
            className: "w-28",
        },
        { label: "Events", name: "events" },
        { label: "Blog", name: "blog" },
        { label: "Contact", name: "contact" },
    ];

    const renderedLinks = config.map(({ label, name, className }, index) => {
        return (
            <Link
                key={index}
                to={`/${name}`}
                className={`hover:text-gray-100 ${className}`}
            >
                {label}
            </Link>
        );
    });

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
        <div className="fixed left-0 right-0 top-0 z-50 flex flex-row justify-between text-white bg-red-main p-4 h-20 md:px-8">
            <div className="flex flex-row items-center flex-1 md:space-x-3">
                <AiOutlinePhone className="hidden text-5xl bg-white text-red-main p-1 rounded-full xl:block" />
                <div className="flex flex-col">
                    <p className="text-xs">ORDER NOW</p>
                    <p className="font-bold">012 345 678</p>
                </div>
            </div>
            <div className="hidden flex-row items-center justify-between space-x-6 md:flex">
                {renderedLinks}
            </div>
            <div className="flex items-center justify-end flex-1 text-3xl  space-x-5">
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
