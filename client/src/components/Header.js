import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePhone } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { useUser } from "../hooks/use-user";
import { useThunk } from "../hooks/use-thunk";
import { fetchCart, fetchUser, fetchProducts } from "../store";
import HamburgerMenu from "./HamburgerMenu";
import CartIcon from "./CartIcon";

const Header = () => {
    const { user } = useUser();
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
        { label: "Homepage", name: "" },
        {
            label: "Products",
            name: "products",
        },
        { label: "Menu", name: "menu" },
        {
            label: (
                <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 320.000000 138.000000"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <metadata>
                        Created by potrace 1.10, written by Peter Selinger
                        2001-2011
                    </metadata>
                    <g
                        transform="translate(0.000000,138.000000) scale(0.100000,-0.100000)"
                        fill="#ffffff"
                        stroke="none"
                    >
                        <path
                            d="M1052 1264 c-13 -9 -36 -40 -53 -69 -33 -58 -27 -55 -159 -75 -224
               -34 -323 -88 -350 -192 -13 -48 -6 -103 19 -145 31 -51 123 -81 150 -49 17 20
               2 46 -26 46 -37 0 -83 51 -83 92 0 71 55 123 165 157 69 21 213 47 221 38 7
               -7 -112 -378 -147 -454 -26 -60 -41 -74 -53 -54 -11 18 -97 51 -132 51 -49 0
               -96 -24 -117 -59 -19 -33 -23 -112 -6 -143 14 -26 68 -48 122 -48 44 0 134 37
               157 65 10 13 31 -3 129 -98 173 -166 265 -208 383 -173 89 25 153 115 90 124
               -15 2 -32 -7 -51 -26 -39 -42 -95 -56 -154 -38 -61 18 -106 53 -236 179 l-108
               106 28 58 c29 62 61 152 134 385 l47 147 50 17 c70 23 118 67 118 108 0 19 -8
               40 -18 49 -24 22 -90 22 -120 1z m68 -53 c0 -9 -44 -41 -56 -41 -4 0 3 11 16
               25 24 26 40 32 40 16z m-437 -697 c37 -24 38 -26 22 -44 -23 -25 -77 -50 -109
               -50 -31 0 -66 32 -66 60 0 12 12 32 26 47 30 30 67 27 127 -13z"
                        />
                        <path
                            d="M1253 910 c-77 -39 -161 -182 -189 -324 -30 -143 1 -216 91 -216 52
               0 77 10 118 48 22 21 27 23 27 9 0 -33 37 -57 88 -57 26 0 53 4 61 9 10 7 18
               5 26 -6 7 -10 19 -13 32 -9 16 5 31 36 63 129 67 194 181 377 235 377 23 0 45
               -30 45 -61 0 -17 -28 -115 -62 -218 -34 -104 -58 -196 -55 -205 9 -23 44 -20
               57 4 6 12 31 80 56 153 52 150 89 221 149 283 45 47 72 55 98 26 25 -27 22
               -51 -28 -198 -52 -152 -57 -215 -24 -258 17 -22 28 -26 73 -26 46 0 58 5 94
               35 39 34 41 35 51 16 22 -41 41 -51 97 -51 48 0 59 4 91 34 l37 33 21 -31 c18
               -28 27 -31 76 -34 50 -3 58 0 96 33 29 24 57 65 87 126 44 88 48 112 20 123
               -26 10 -40 -4 -68 -69 -35 -80 -98 -155 -132 -155 -48 0 -30 95 72 363 42 109
               44 137 9 137 -14 0 -29 -8 -34 -19 -10 -19 -11 -19 -48 0 -116 59 -225 -29
               -307 -249 -56 -151 -112 -232 -161 -232 -23 0 -25 4 -25 43 0 25 17 94 41 161
               71 208 51 296 -69 296 -37 0 -88 -25 -129 -63 -19 -17 -23 -18 -23 -5 0 9 -14
               28 -31 42 -36 31 -101 35 -138 10 -22 -16 -24 -16 -33 0 -11 19 -42 21 -55 4
               -5 -7 -29 -69 -53 -138 -76 -219 -153 -350 -206 -350 -52 0 -43 54 50 310 31
               84 56 161 56 171 0 14 -7 19 -30 19 -16 0 -30 -3 -30 -7 0 -5 -4 -15 -10 -23
               -8 -12 -11 -12 -28 3 -31 28 -100 31 -149 7z m101 -61 c36 -28 34 -57 -14
               -174 -66 -161 -126 -245 -175 -245 -56 0 -58 102 -5 237 36 93 74 150 119 180
               41 28 42 28 75 2z m1185 11 c10 -5 24 -22 30 -38 11 -27 8 -41 -33 -141 -71
               -174 -128 -251 -183 -251 -39 0 -48 41 -30 132 25 127 92 253 152 290 35 21
               40 21 64 8z"
                        />
                    </g>
                </svg>
            ),
            name: "",
            className: "w-28",
        },
        {
            label: "Events",
            name: "events",
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
