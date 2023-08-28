import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/use-title";
import { useThunk } from "../hooks/use-thunk";
import { fetchOrder } from "../store";
import { AiOutlineFile } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { formatDate } from "../utils/functions/formatDate";
import OrderList from "../components/OrderList";

const OrderPage = ({ data }) => {
    const { orderId } = useParams();
    const [doFetchOrder] = useThunk(fetchOrder);

    useEffect(() => {
        doFetchOrder(orderId);
    }, [doFetchOrder, orderId]);

    useTitle("Order");

    if (!data) {
        return <div>Loading...</div>;
    }

    console.log(data);

    return (
        <div className="flex flex-col items-center space-y-4 md:max-w-3xl md:mx-auto">
            <div className="flex flex-col py-2 border-b pb-4">
                <div className="flex flex-col font-semibold space-x-24 md:flex-row md: space-y-2">
                    <h1 className="text-2xl">Order ID: {data._id}</h1>
                    <div className="flex flex-row space-x-2">
                        <button className="flex items-center border border-gray-400 p-1 rounded hover:bg-gray-100">
                            <AiOutlineFile />
                            <div>Invoice</div>
                        </button>
                        <button className="flex items-center bg-blue-500 text-white p-1 rounded hover:bg-blue-600">
                            <BiCurrentLocation />
                            <div>Track order</div>
                        </button>
                    </div>
                </div>
                <div className="text-gray-600 mt-2 md:mt-0">
                    Order date: {formatDate(data.createdAt)}
                </div>
            </div>
            <OrderList />
        </div>
    );
};

const OrderDetailsWrapper = () => {
    const data = useSelector((state) => state.orders.data) || [];
    return <OrderPage data={data} />;
};

export default OrderDetailsWrapper;
