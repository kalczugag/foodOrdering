import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SortableTable from "./SortableTable";

const AdminOrders = () => {
    const data = useSelector((state) => state.orders.data) || [];

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
            render: () => <button>Next Stage</button>,
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
