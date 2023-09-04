import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/use-title";
import { useThunk } from "../hooks/use-thunk";
import { fetchOrder } from "../store";
import OrderHeader from "../components/OrderHeader";
import OrderList from "../components/OrderList";
import OrderFooter from "../components/OrderFooter";
import Skeleton from "react-loading-skeleton";

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
                <div className="flex flex-col space-y-4 md:max-w-3xl md:mx-auto">
                    <Skeleton height={40} />
                    <Skeleton height={20} count={6} />
                    <div className="flex flex-row justify-between">
                        <Skeleton height={20} width={70} />
                        <Skeleton height={20} width={70} count={5} />
                    </div>
                </div>
            )}
        </>
    );
};

const OrderDetailsWrapper = () => {
    const data = useSelector((state) => state.orders.data) || [];
    return <OrderPage data={data} />;
};

export default OrderDetailsWrapper;
