import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineDone, MdOutlinePaid } from "react-icons/md";

const OrderFooter = ({ data }) => {
    let statusWithIcon;

    if (data.status === "paid") {
        statusWithIcon = (
            <>
                <MdOutlinePaid />
                {data.status}
            </>
        );
    } else if (data.status === "delivery") {
        statusWithIcon = (
            <>
                <CiDeliveryTruck />
                {data.status}
            </>
        );
    } else {
        statusWithIcon = (
            <>
                <MdOutlineDone />
                {data.status}
            </>
        );
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold">Status</h3>
                <div
                    className={`flex flex-row items-center text-green-main ${
                        data.status === "paid" || data.status === "delivery"
                            ? "animate-pulse"
                            : ""
                    }`}
                >
                    {statusWithIcon}
                </div>
            </div>
            <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold">Delivery</h3>
                <p className="text-sm text-gray-600">Address</p>
                <div></div>
            </div>
        </div>
    );
};

export default OrderFooter;
