import { Link } from "react-router-dom";
import _ from "lodash";
import SortableTable from "./SortableTable";

const formatDateString = (inputDateString) => {
    return _.chain(new Date(inputDateString))
        .thru((date) => ({
            year: date.getFullYear(),
            month: String(date.getMonth() + 1).padStart(2, "0"),
            day: String(date.getDate()).padStart(2, "0"),
            hours: String(date.getHours()).padStart(2, "0"),
            minutes: String(date.getMinutes()).padStart(2, "0"),
            seconds: String(date.getSeconds()).padStart(2, "0"),
        }))
        .thru(
            ({ year, month, day, hours, minutes, seconds }) =>
                `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        )
        .value();
};

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
            render: (item) => formatDateString(item.createdAt),
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
