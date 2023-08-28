import { Link } from "react-router-dom";
import { formatDate } from "../utils/functions/formatDate";
import SortableTable from "./SortableTable";

const PaymentList = ({ data }) => {
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
            label: "Ordered At",
            render: (item) => formatDate(item.createdAt),
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
    ];

    const keyFn = (data) => {
        return data.id;
    };

    return (
        <div>
            <SortableTable config={config} data={data} keyFn={keyFn} />
        </div>
    );
};

export default PaymentList;
