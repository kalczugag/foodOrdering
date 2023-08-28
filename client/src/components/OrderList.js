import OrderListItem from "./OrderListItem";

const OrderList = ({ data }) => {
    const renderedItems = data.map((item) => {
        return <OrderListItem key={item.title} item={item} />;
    });

    return <div className="w-full border-y pb-2 pt-4">{renderedItems}</div>;
};

export default OrderList;
