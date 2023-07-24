import SortableTable from "./SortableTable";
import { useSelector } from "react-redux";

const AdminProducts = () => {
    const data = useSelector((state) => state.products.data) || [];

    const config = [
        {
            label: "Image",
            render: (item) => item.image,
        },
        {
            label: "Id",
            render: (item) => item.Id,
        },
        {
            label: "Title",
            render: (item) => item.title,
        },
        {
            label: "Price",
            render: (item) => item.price,
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
                <button className="text-red-main font-bold">Add New</button>
            </div>
            <div>
                <SortableTable data={data} config={config} keyFn={keyFn} />
            </div>
        </div>
    );
};

export default AdminProducts;
