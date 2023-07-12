import { Link } from "react-router-dom";

const CartTotal = ({
    data: { totalPrice, subtotal, discount, itemsCount },
}) => {
    const handleCheckoutClick = () => {
        if (itemsCount) {
        }
        //open delivery details form
        //proceed to stripe payment

        console.log({
            title: "pizza",
            desc: "desc",
            img: "img",
            price: 10,
            extraOptions: [
                { text: "cheese", price: 1 },
                { text: "chorrizo", price: 2 },
            ],
        });
    };

    return (
        <div className="flex flex-col space-y-3 p-12 bg-gray-main text-white">
            <h2 className="text-2xl font-bold">CART TOTAL</h2>
            <div className="flex flex-col">
                <p>Subtotal: ${subtotal}</p>
                <p>Discount: ${(discount * 100).toFixed(2)}</p>
                <p>Total: ${totalPrice}</p>
            </div>
            <Link
                onClick={handleCheckoutClick}
                to={itemsCount ? "checkout" : ""}
                className="bg-white p-2 px-14 text-red-main font-bold hover:bg-gray-100"
            >
                CHECKOUT NOW
            </Link>
        </div>
    );
};

export default CartTotal;
