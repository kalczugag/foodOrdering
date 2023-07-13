import { handlePayment } from "../store";
import { useThunk } from "../hooks/use-thunk";

const CartTotal = ({
    data: { totalPrice, subtotal, discount, itemsCount },
}) => {
    const [doHandlePayment] = useThunk(handlePayment);

    const handleCheckoutClick = () => {
        doHandlePayment([
            { id: 1, quantity: 3 },
            { id: 2, quantity: 1 },
        ]);
        //open delivery details form
        //proceed to stripe payment
    };

    return (
        <div className="flex flex-col space-y-3 p-12 bg-gray-main text-white">
            <h2 className="text-2xl font-bold">CART TOTAL</h2>
            <div className="flex flex-col">
                <p>Subtotal: ${subtotal}</p>
                <p>Discount: ${(discount * 100).toFixed(2)}</p>
                <p>Total: ${totalPrice}</p>
            </div>
            <button
                onClick={handleCheckoutClick}
                className="bg-white p-2 px-14 text-red-main font-bold hover:bg-gray-100"
            >
                CHECKOUT NOW
            </button>
        </div>
    );
};

export default CartTotal;
