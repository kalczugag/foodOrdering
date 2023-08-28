const OrderList = () => {
    const data = [
        {
            title: "123",
            img: "https://i.stack.imgur.com/etJFB.jpg",
            price: 12,
            quantity: 2,
            size: "Large",
            extraOptions: [],
        },
        {
            title: "1",
            img: "https://i.stack.imgur.com/etJFB.jpg",
            price: 123,
            quantity: 1,
            size: "Large",
            extraOptions: [],
        },
        {
            title: "2",
            img: "https://i.stack.imgur.com/etJFB.jpg",
            price: 142,
            quantity: 3,
            size: "Large",
            extraOptions: [],
        },
        {
            title: "3",
            img: "https://i.stack.imgur.com/etJFB.jpg",
            price: 112,
            quantity: 52,
            size: "Small",
            extraOptions: [],
        },
    ];

    const renderedItems = data.map((item) => {
        return (
            <div className="flex flex-row justify-between mb-2 space-x-4">
                <div>
                    <img
                        className="w-16 h-16 rounded border border-gray-600"
                        src={item.img}
                        alt={item.title}
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <h6>{item.title}</h6>
                    <p className="text-gray-600">{item.size}</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
            </div>
        );
    });

    return <div className="w-full px-10 border-b pb-2">{renderedItems}</div>;
};

export default OrderList;
