import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handlePayment, changeDiscountCode } from "../store";
import { useThunk } from "../hooks/use-thunk";

const CartTotal = () => {
    const dispatch = useDispatch();
    const [showDiscountInput, setShowDiscountInput] = useState(false);
    const [doHandlePayment] = useThunk(handlePayment);

    const { totalPrice, subtotal, discount, discountCode, itemsCount } =
        useSelector((state) => state.cart);

    const handleCheckoutClick = () => {
        doHandlePayment([
            { id: 1, quantity: 3 },
            { id: 2, quantity: 1 },
        ]);
        //open delivery details form
        //proceed to stripe payment
    };

    const handleDiscountClick = () => {
        setShowDiscountInput(!showDiscountInput);
    };

    const handleChangeCode = (event) => {
        dispatch(changeDiscountCode(event.target.value));
    };

    let shownDiscount = discount * subtotal;

    return (
        <div className="flex flex-col space-y-3 p-12 bg-gray-main text-white">
            <h2 className="text-2xl font-bold">CART TOTAL</h2>
            <div className="flex flex-col">
                <p>Subtotal: ${subtotal}</p>
                <p>Discount: ${shownDiscount.toFixed(2)}</p>
                <p>Total: ${totalPrice}</p>
            </div>
            <button
                onClick={handleCheckoutClick}
                className="bg-white p-2 px-14 text-red-main font-bold hover:bg-gray-100"
            >
                CHECKOUT NOW
            </button>
            {showDiscountInput ? (
                <input
                    type="text"
                    value={discountCode}
                    onChange={handleChangeCode}
                />
            ) : (
                <button onClick={handleDiscountClick} className="text-sm">
                    I have a discount code
                </button>
            )}
        </div>
    );
};

export default CartTotal;
