import { AiOutlinePhone, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
    const config = [
        { label: "Homepage", name: "" },
        { label: "Products", name: "products" },
        { label: "Menu", name: "menu" },
        { label: "Lama", className: "italic text-4xl" },
        { label: "Events", name: "events" },
        { label: "Blog", name: "blog" },
        { label: "Contact", name: "contact" },
    ];

    const renderedLinks = config.map(({ label, name, className }, index) => {
        return (
            <Link key={index} to={`/${name}`} className={className}>
                {label}
            </Link>
        );
    });

    return (
        <div className="flex flex-row justify-between text-white bg-red-main p-4 px-8">
            <div className="flex flex-row items-center space-x-3">
                <AiOutlinePhone className="text-5xl bg-white text-red-main p-1 rounded-full" />
                <div className="flex flex-col">
                    <p className="text-xs">ORDER NOW</p>
                    <p className="font-bold">012 345 678</p>
                </div>
            </div>
            <div className="hidden flex-row items-center justify-between space-x-4 md:flex">
                {renderedLinks}
            </div>
            <div className="flex items-center">
                <Link>
                    <AiOutlineShoppingCart className="text-3xl" />
                </Link>
            </div>
        </div>
    );
};

export default Header;
