import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/use-title";
import { useThunk } from "../hooks/use-thunk";
import { fetchOrder } from "../store";
import OrderHeader from "../components/OrderHeader";
import OrderList from "../components/OrderList";
import OrderFooter from "../components/OrderFooter";

const OrderPage = ({ data }) => {
    const { orderId } = useParams();
    const [doFetchOrder, fetchOrderLoading] = useThunk(fetchOrder);

    useTitle("Order");

    useEffect(() => {
        doFetchOrder(orderId);
    }, [doFetchOrder, orderId]);

    return (
        <>
            {!fetchOrderLoading ? (
                <div className="flex flex-col space-y-4 md:max-w-3xl md:mx-auto">
                    <OrderHeader data={data} />
                    <OrderList data={data.products || []} />
                    <OrderFooter data={data} />
                </div>
            ) : (
                "loading..."
            )}
        </>
    );
};

const OrderDetailsWrapper = () => {
    const data = useSelector((state) => state.orders.data) || [];
    return <OrderPage data={data} />;
};

export default OrderDetailsWrapper;
