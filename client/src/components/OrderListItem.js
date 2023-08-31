const OrderListItem = ({ item }) => {
    return (
        <div className="flex flex-row justify-between mb-2 space-x-4">
            <div className="w-16 h-16 rounded border border-gray-300 bg-gray-100">
                <img src={item.img} alt={item.title} />
            </div>
            <div className="flex flex-col flex-1">
                <h6>{item.title}</h6>
                <p className="text-gray-600">{item.size}</p>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">${item.price.toFixed(2)}</p>
                <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
            </div>
        </div>
    );
};

export default OrderListItem;
