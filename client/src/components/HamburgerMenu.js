import "../utils/styles/hamburgerMenu.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineHome, AiFillRead } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineForum, MdOutlineEvent } from "react-icons/md";

const HamburgerMenu = () => {
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);

    const config = [
        { label: "Home", icon: <AiOutlineHome />, to: "/" },
        { label: "Events", icon: <MdOutlineEvent />, to: "/events" },
        { label: "Blog", icon: <AiFillRead />, to: "/blog" },
        { label: "Contact", icon: <MdOutlineForum />, to: "/contact" },
    ];

    const icon = !isOpen ? (
        <AiOutlineMenu />
    ) : (
        <RxCross1 className={`${isOpen ? "text-gray-main" : ""}`} />
    );

    const handleOpenMenu = () => {
        setIsOpen(!isOpen);
    };

    const renderedList = config.map(({ label, icon, to }, index) => {
        const isActive = location.pathname === to;
        const activeClass = isActive ? "bg-gray-200" : "";

        return (
            <li className={`${activeClass} rounded-tr-full rounded-br-full`}>
                <Link
                    className="flex items-center space-x-2 p-2"
                    to={to}
                    onClick={() => setIsOpen(false)}
                    key={index}
                >
                    <div>{icon}</div>
                    <div>{label}</div>
                </Link>
            </li>
        );
    });

    return (
        <div className="flex items-center relative md:hidden">
            {isOpen && (
                <div className="fixed inset-0" onClick={handleOpenMenu} />
            )}
            <button
                className="absolute w-full text-3xl z-40"
                onClick={handleOpenMenu}
            >
                {icon}
            </button>
            <div
                className={`absolute w-72 h-screen-plus -left-4 -top-4 bottom-0 pr-2 bg-white text-black opacity-90 z-30 ${
                    isOpen ? "open-animation" : "close-animation"
                }`}
                style={{
                    visibility: isOpen ? "visible" : "hidden",
                    opacity: isOpen ? 1 : 0,
                }}
            >
                <ul className="flex flex-col space-y-2 list-none py-16 text-xl">
                    {renderedList}
                </ul>
            </div>
        </div>
    );
};

export default HamburgerMenu;
