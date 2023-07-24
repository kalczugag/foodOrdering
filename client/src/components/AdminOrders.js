import { useSelector } from "react-redux";
import SortableTable from "./SortableTable";

const AdminOrders = () => {
    const data = useSelector((state) => state.orders.data) || [];

    const config = [
        {
            label: "Id",
            render: (item) => item.id,
        },
        {
            label: "Customer",
            render: (item) => item._user,
        },
        {
            label: "Total",
            render: (item) => item.total,
            sortValue: (item) => item.total,
        },
        {
            label: "Status",
            render: (item) => item.status,
        },
        {
            label: "Action",
            render: () => <button>Net Stage</button>,
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
