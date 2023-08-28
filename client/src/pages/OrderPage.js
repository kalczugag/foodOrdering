import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/use-title";
import { useThunk } from "../hooks/use-thunk";
import { fetchOrder } from "../store";
import { AiOutlineFile } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { formatDate } from "../utils/functions/formatDate";

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
        <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col py-2 border-b">
                <div className="flex flex-row font-semibold space-x-24">
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
                <div className="flex flex-row">
                    <div className="text-gray-600">
                        <span className="text-gray-500">Order date:</span>{" "}
                        {formatDate(data.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderDetailsWrapper = () => {
    const data = useSelector((state) => state.orders.data) || [];
    return <OrderPage data={data} />;
};

export default OrderDetailsWrapper;
