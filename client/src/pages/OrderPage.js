import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/use-title";
import { useThunk } from "../hooks/use-thunk";
import { fetchOrder } from "../store";

const OrderPage = ({ data }) => {
    const { orderId } = useParams();
    const [doFetchOrder] = useThunk(fetchOrder);

    useEffect(() => {
        doFetchOrder(orderId);
    }, [doFetchOrder, orderId]);

    const thisOrder = useMemo(
        () => data.find((order) => order._id === orderId),
        [data, orderId]
    );

    useTitle("Order");

    if (!thisOrder) {
        return <div>Loading...</div>;
    }

    console.log(thisOrder);

    return <div>x</div>;
};

const OrderDetailsWrapper = () => {
    const data = useSelector((state) => state.orders.data) || [];
    return <OrderPage data={data} />;
};

export default OrderDetailsWrapper;
