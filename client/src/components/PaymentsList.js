import SortableTable from "./SortableTable";
import _ from "lodash";

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

const PaymentsList = ({ data }) => {
    const config = [
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
            label: "Ordered at",
            render: (item) => formatDateString(item.createdAt),
        },
    ];

    const keyFn = (data) => {
        return data.id;
    };

    return (
        <div>
            <SortableTable data={data} config={config} keyFn={keyFn} />
        </div>
    );
};

export default PaymentsList;
