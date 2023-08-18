import { useParams } from "react-router-dom";

const OrderPage = () => {
    const { orderId } = useParams();

    return <div>{orderId}</div>;
};

export default OrderPage;
