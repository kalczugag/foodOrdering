import { useState } from "react";
import { Link } from "react-router-dom";

const MainProductItem = ({ data }) => {
    const [isActive, setIsActive] = useState(false);

    const minPrice = data.price && data.price[0];
    const maxPrice = data.price && data.price[2];

    return (
        <Link
            key={data.title}
            to={`/products/${data._id}`}
            className="flex flex-col items-center space-y-1"
            onMouseOver={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            <img
                loading="lazy"
                className="md:w-3/4"
                src={data.img}
                alt={data.title}
            />

            <p
                className={`text-red-500 text-xl border-b transition-all ${
                    isActive ? "border-red-main" : "border-white"
                }`}
            >
                {data.title}
            </p>
            {minPrice !== undefined && maxPrice !== undefined && (
                <p className="font-bold">
                    ${minPrice} - ${maxPrice}
                </p>
            )}
            <p>{data.desc}</p>
        </Link>
    );
};

export default MainProductItem;
