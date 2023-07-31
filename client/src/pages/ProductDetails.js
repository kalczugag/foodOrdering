import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store";
import { useThunk } from "../hooks/use-thunk";
import { fetchProducts } from "../store";

const ProductDetails = ({ data }) => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const [showPrice, setShowPrice] = useState(0);
    const [count, setCount] = useState(1);
    const [doFetchProducts] = useThunk(fetchProducts);

    useEffect(() => {
        if (!data) {
            doFetchProducts();
        }
    }, [doFetchProducts, data]);

    // Memoize the result of finding the product object by _id
    const thisProduct = useMemo(
        () => data.find((prod) => prod._id === productId),
        [data, productId]
    );

    // Make sure thisProduct exists before accessing its properties
    if (!thisProduct) {
        return <div>Loading...</div>;
    }
    const { price, desc, img, title } = thisProduct;

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                ...thisProduct,
                price: price[showPrice],
                quantity: count,
            })
        );
    };

    const handleChangeCount = (event) => {
        setCount(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center p-10 md:h-screen-fit md:space-x-24 md:flex-row">
            <div className="flex-1 flex justify-end">
                <img className="w-96 h-96" src={img} alt={title} />
            </div>
            <div className="flex flex-col flex-1 space-y-4">
                <h3 className="text-xl text-red-main underline-offset-4 underline">
                    ${price[showPrice]}
                </h3>
                <p className="w-1/2">{desc}</p>
                <div>
                    <div className="font-bold">Choose the size</div>
                    <div className="flex flex-row space-x-12 mt-2">
                        <button
                            className="relative"
                            onClick={() => setShowPrice(0)}
                        >
                            <img
                                className="w-10 h-10"
                                src={require("../utils/images/size.png")}
                                alt="size"
                            />
                            <div className="absolute top-0 -right-8 color text-white text-sm rounded-xl px-2">
                                Small
                            </div>
                        </button>
                        <button
                            className="relative"
                            onClick={() => setShowPrice(1)}
                        >
                            <img
                                className="w-12 h-12"
                                src={require("../utils/images/size.png")}
                                alt="size"
                            />
                            <div className="absolute top-0 -right-8 color text-white text-sm rounded-xl px-2">
                                Medium
                            </div>
                        </button>
                        <button
                            className="relative"
                            onClick={() => setShowPrice(2)}
                        >
                            <img
                                className="w-14 h-14"
                                src={require("../utils/images/size.png")}
                                alt="size"
                            />
                            <div className="absolute top-0 -right-8 color text-white text-sm rounded-xl px-2">
                                Large
                            </div>
                        </button>
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
                        className="bg-red-main text-white p-1"
                    >
                        Add to Cart
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
