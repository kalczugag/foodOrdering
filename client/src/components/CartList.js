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
            render: (item) => item.quantity,
        },
        {
            label: "Total",
            render: () => <div className="font-bold">${totalPrice}</div>,
        },
    ];

    const keyFn = (data) => {
        return data.name;
    };

    const cartNotEmpty = <Table config={config} data={items} keyFn={keyFn} />;

    const cartEmpty = (
        <div className="text-center text-xl font-bold">Your cart is empty.</div>
    );

    return (
        <div className="flex-1">{itemsCount ? cartNotEmpty : cartEmpty}</div>
    );
};

export default CartList;
