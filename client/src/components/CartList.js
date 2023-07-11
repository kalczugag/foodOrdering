import Table from "./Table";

const CartList = ({ data: { items, totalPrice, itemsCount } }) => {
    const config = [
        {
            label: "Product",
            render: (item) => item.image,
        },
        {
            label: "Name",
            render: (item) => item.name,
        },
        {
            label: "Extras",
            render: (item) => item.extras,
        },
        {
            label: "Price",
            render: (item) => `$${item.price}`,
        },
        {
            label: "Quantity",
            render: (item) => item.count,
        },
        {
            label: "Total",
            render: () => <div className="font-bold">${totalPrice}</div>,
        },
    ];

    const keyFn = (data) => {
        return data.name;
    };

    return (
        <div>
            <Table config={config} data={items} keyFn={keyFn} />
        </div>
    );
};

export default CartList;
