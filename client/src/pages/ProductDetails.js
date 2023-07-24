import { useParams } from "react-router-dom";
import ProductsData from "../utils/data";

const ProductDetails = () => {
    const { productId } = useParams();
    const thisProduct = ProductsData.find((prod) => prod.id === productId);

    return <div>{thisProduct.name}</div>;
};

export default ProductDetails;
