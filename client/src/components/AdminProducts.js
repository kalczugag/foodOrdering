import SortableTable from "./SortableTable";
import { useSelector } from "react-redux";

const AdminProducts = ({ action }) => {
    const data = useSelector((state) => state.products.data) || [];

    const config = [
        {
            label: "Image",
            render: (item) => (
                <img src={item.img} alt={item.title} className="w-16" />
            ),
        },
        {
            label: "Id",
            render: (item) => item._id,
        },
        {
            label: "Title",
            render: (item) => item.title,
        },
        {
            label: "Price",
            render: (item) => (
                <div className="flex flex-col">
                    <p>Small: {item.price[0]}</p>
                    <p>Medium: {item.price[1]}</p>
                    <p>Large: {item.price[2]}</p>
                </div>
            ),
            sortValue: (item) => item.price,
        },
        {
            label: "Action",
            render: () => (
                <div>
                    <button className="color">Edit</button>
                    <button>Delete</button>
                </div>
            ),
        },
    ];

    const keyFn = (data) => {
        return data.id;
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-end space-x-4">
                <h1 className="text-3xl font-bold">Products</h1>
                <button
                    className="text-red-main font-bold"
                    onClick={() => action()}
                >
                    Add New
                </button>
            </div>
            <div>
                <SortableTable data={data} config={config} keyFn={keyFn} />
            </div>
        </div>
    );
};

export default AdminProducts;
