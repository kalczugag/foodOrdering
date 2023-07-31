import { useDispatch } from "react-redux";
import { removeFromCart } from "../store";
import Table from "./Table";
import { ImCross } from "react-icons/im";

const CartList = ({ data: { items, totalPrice, itemsCount } }) => {
    const dispatch = useDispatch();
    const config = [
        {
            label: "Product",
            render: (item) => (
                <img className="w-16" src={item.img} alt={item.title} />
            ),
        },
        {
            label: "Name",
            render: (item) => item.title,
        },
        // {
        //     label: "Extras",
        //     render: (item) => item.extras,
        // },
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
        {
            label: "Actions",
            render: (item) => (
                <button onClick={() => handleRemoveFromCart(item)}>
                    <ImCross className="text-red-main" />
                </button>
            ),
        },
    ];

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));
    };

    const keyFn = (data) => {
        return data.name;
    };

    const cartNotEmpty = <Table config={config} data={items} keyFn={keyFn} />;

    const cartEmpty = (
        <div className="text-center text-xl font-bold">Your cart is empty.</div>
    );

    return <div>{itemsCount ? cartNotEmpty : cartEmpty}</div>;
};

export default CartList;
