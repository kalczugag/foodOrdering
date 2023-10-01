export const config = [
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
