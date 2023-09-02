import SortableTable from "./SortableTable";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { removeProduct } from "../store";
import { Link } from "react-router-dom";

const AdminProducts = ({ onOpen, onEdit }) => {
    const data = useSelector((state) => state.products.data) || [];
    const [doRemoveProduct] = useThunk(removeProduct);

    const config = [
        {
            label: "Image",
            render: (item) => (
                <img
                    loading="lazy"
                    src={item.img}
                    alt={item.title}
                    className="w-16"
                />
            ),
        },
        {
            label: "Id",
            render: (item) => (
                <Link
                    to={`/products/${item._id}`}
                    className="border-b hover:border-gray-main"
                >
                    {item._id}
                </Link>
            ),
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
            sortValue: (item) => item.price[0],
        },
        {
            label: "Action",
            render: (item) => (
                <div className="flex flex-col items-center text-white md:space-x-2 md:flex-row">
                    <button
                        onClick={() => onEdit(item)}
                        className="w-full color p-1 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleRemoveProduct(item)}
                        className="w-full bg-red-main p-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const handleRemoveProduct = (item) => {
        doRemoveProduct(item);
    };

    const keyFn = (data) => {
        return data.id;
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-end space-x-4">
                <h1 className="text-3xl font-bold">Products</h1>
                <button
                    className="text-red-main font-bold"
                    onClick={() => onOpen()}
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
