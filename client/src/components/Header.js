import { Link } from "react-router-dom";
import { AiOutlinePhone } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { useUser } from "../hooks/use-user";
import HamburgerMenu from "./HamburgerMenu";
import CartIcon from "./CartIcon";

const Header = () => {
    const { user } = useUser();

    const config = [
        { label: "Homepage", name: "" },
        {
            label: "Events",
            name: "events",
        },
        {
            label: <img src="/svg/logo.svg" alt="logo" />,
            name: "",
            className: "w-28",
        },
        { label: "Blog", name: "blog" },
        {
            label: "Contact",
            name: "contact",
        },
    ];

    const renderedLinks = config.map(({ label, name, className }, index) => {
        return (
            <Link
                key={index}
                to={name}
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
            <a href="/api/logout" className="hidden md:block">
                <FiLogOut />
            </a>
        </>
    );

    return (
        <div className="fixed top-0 w-screen z-20 flex flex-row justify-between text-white bg-red-main p-4 h-20 md:w-full md:px-8">
            <div className=" flex-row items-center flex-1 space-x-3 hidden md:flex">
                <AiOutlinePhone className="text-5xl bg-white text-red-main p-1 rounded-full sm:block md:hidden xl:block" />
                <div className="flex-col sm:block md:hidden xl:block">
                    <p className="text-xs">ORDER NOW</p>
                    <p className="font-bold">012 345 678</p>
                </div>
            </div>
            <HamburgerMenu />
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
