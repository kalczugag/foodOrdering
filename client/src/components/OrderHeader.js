import { AiOutlineFile } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { formatDate } from "../utils/functions/formatDate";

const OrderHeader = ({ data }) => {
    return (
        <div className="flex flex-col pt-2">
            <div className="flex flex-col justify-between font-semibold space-x-24 md:flex-row md: space-y-2">
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
            <div className="text-gray-600 mt-2">
                Order date: {formatDate(data.createdAt)}
            </div>
        </div>
    );
};

export default OrderHeader;
