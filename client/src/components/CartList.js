import { useThunk } from "../hooks/use-thunk";
import { removeFromCart } from "../store";
import { ImCross } from "react-icons/im";
import Table from "./Table";

const CartList = ({ data: { items, itemsCount } }) => {
    const [doRemoveFromCart] = useThunk(removeFromCart);

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
            label: "Size",
            render: (item) => item.size,
        },

        {
            label: "Total",
            render: (item) => (
                <div className="font-bold">${item.price * item.quantity}</div>
            ),
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
        doRemoveFromCart(item);
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
