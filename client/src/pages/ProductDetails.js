import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { fetchProducts } from "../store";

const ProductDetails = ({ data }) => {
    const { productId } = useParams();
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

    const { price, desc, img } = thisProduct;

    return (
        <div className="flex flex-row">
            {price}
            {desc}
            {img}
        </div>
    );
};

const ProductDetailsWrapper = () => {
    const data = useSelector((state) => state.products.data) || [];
    return <ProductDetails data={data} />;
};

export default ProductDetailsWrapper;
