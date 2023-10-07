import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { addToCart } from "../store";
import PizzaSizeButton from "../components/PizzaSizeButton";
import { useTitle } from "../hooks/use-title";
import { useUser } from "../hooks/use-user";
import Skeleton from "react-loading-skeleton";

const Box = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "0.5rem",
                width: 250,
            }}
        >
            {children}
        </div>
    );
};

const ProductDetails = ({ data }) => {
    const { productId } = useParams();

    const [showPrice, setShowPrice] = useState(0);
    const [count, setCount] = useState(1);
    const [buttonValue, setButtonValue] = useState("Add to Cart");

    const [doUpdateCart, cartUpdateLoading] = useThunk(addToCart);

    const { user } = useUser();

    // Memoize the result of finding the product object by _id
    const thisProduct = useMemo(
        () => data.find((prod) => prod._id === productId),
        [data, productId]
    );

    useTitle(thisProduct?.title + " Pizza");

    // Make sure thisProduct exists before accessing its properties
    if (!thisProduct) {
        return (
            <div className="flex flex-col justify-center items-center space-y-4 p-10 md:space-y-0 md:space-x-24 md:flex-row">
                <Skeleton width={400} height={380} />
                <Skeleton wrapper={Box} count={5} />
            </div>
        );
    }

    const sizes = [
        { label: "Small", size: { width: 45, height: 45 } },
        { label: "Medium", size: { width: 50, height: 50 } },
        { label: "Large", size: { width: 55, height: 55 } },
    ];

    const renderedSizes = sizes.map((size, index) => {
        return (
            <PizzaSizeButton
                key={size.label}
                data={size}
                index={index}
                priceFn={setShowPrice}
                currentIndex={showPrice}
            />
        );
    });

    const productSizes = ["Small", "Medium", "Large"];
    const { price, desc, img, title } = thisProduct;
    const handleAddToCart = () => {
        doUpdateCart({
            ...thisProduct,
            price: price[showPrice],
            quantity: Number(count),
            size: productSizes[showPrice],
        });

        setShowPrice(0);
        setCount(1);
    };

    const handleChangeCount = (event) => {
        setCount(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center p-10 md:space-x-24 md:flex-row">
            <div className="flex-1 flex justify-end">
                <img
                    className="w-96 h-96 object-contain"
                    src={img}
                    alt={title}
                    loading="lazy"
                />
            </div>
            <div className="flex flex-col flex-1 space-y-4">
                <h3 className="text-xl text-red-main underline-offset-4 underline">
                    ${price[showPrice]}
                </h3>
                <p className="w-1/2">{desc}</p>
                <div>
                    <div className="font-bold">Choose the size</div>
                    <div className="flex flex-row space-x-12 mt-2">
                        {renderedSizes}
                    </div>
                </div>
                <div className="font-bold">Choose additional ingredients</div>
                <div className="flex flex-row space-x-4">
                    <input
                        type="number"
                        onChange={handleChangeCount}
                        value={count}
                        className="w-14 rounded-none"
                    />
                    <button
                        onClick={handleAddToCart}
                        className="bg-red-main text-white p-1 w-28"
                        disabled={cartUpdateLoading || !user}
                        onMouseOver={() =>
                            !user &&
                            setButtonValue(
                                <div className="text-sm">You must log in</div>
                            )
                        }
                        onMouseOut={() =>
                            !user && setButtonValue("Add to Cart")
                        }
                    >
                        {buttonValue}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductDetailsWrapper = () => {
    const data = useSelector((state) => state.products.data) || [];
    return <ProductDetails data={data} />;
};

export default ProductDetailsWrapper;
