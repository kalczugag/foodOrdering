import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { orderStatusChange } from "../store";
import SortableTable from "./SortableTable";
import { useState } from "react";

const status = ["paid", "delivery", "delivered"];

const AdminOrders = () => {
    const [doStatusChange, isStatusChangeLoading] = useThunk(orderStatusChange);
    const [statusIndex, setStatusIndex] = useState(0);
    const data = useSelector((state) => state.orders.data) || [];

    const handleStatusChange = (item) => {
        if (statusIndex >= 0 && statusIndex < 2) {
            setStatusIndex(statusIndex + 1);
        } else {
            setStatusIndex(0);
        }

        const newIndex =
            statusIndex >= 0 && statusIndex < 2 ? statusIndex + 1 : 0;

        doStatusChange({
            _id: item._id,
            status: status[newIndex],
        });
    };

    const config = [
        {
            label: "Order",
            render: (item) => (
                <Link
                    to={`/orders/${item._id}`}
                    className="border-b hover:border-gray-main"
                >
                    View order
                </Link>
            ),
        },
        {
            label: "Customer",
            render: (item) => item._user,
        },
        {
            label: "Total",
            render: (item) => `$${item.total / 100}`,
            sortValue: (item) => item.total,
        },
        {
            label: "Status",
            render: (item) => (
                <div className="text-green-main">{item.status}</div>
            ),
        },
        {
            label: "Action",
            render: (item) => (
                <button
                    onClick={() => handleStatusChange(item)}
                    disabled={isStatusChangeLoading}
                >
                    {isStatusChangeLoading ? "loading..." : "Next Stage"}
                </button>
            ),
        },
    ];

    const keyFn = (data) => {
        return data.id;
    };
    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">Orders</h1>
            <SortableTable data={data} config={config} keyFn={keyFn} />
        </div>
    );
};

export default AdminOrders;
