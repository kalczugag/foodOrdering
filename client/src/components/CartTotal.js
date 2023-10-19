import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handlePayment, changeDiscountCode, checkDiscount } from "../store";
import { useThunk } from "../hooks/use-thunk";
import { useUser } from "../hooks/use-user";
import { GoSync } from "react-icons/go";

const CartTotal = () => {
    const dispatch = useDispatch();
    const { user } = useUser();

    const [showDiscountInput, setShowDiscountInput] = useState(false);

    const [doHandlePayment, paymentLoading] = useThunk(handlePayment);
    const [doCheckDiscount, isChecking] = useThunk(checkDiscount);

    const { items, totalPrice, subtotal, discount, discountCode, itemsCount } =
        useSelector((state) => state.cart);
    const shownDiscount = discount * subtotal;

    const handleCheckoutClick = () => {
        if (
            itemsCount > 0 &&
            items &&
            user.address.city &&
            user.address.street &&
            user.address.postal
        ) {
            doHandlePayment({ items, discount });
        } else {
            console.error(
                "You have to set address in your profile to place an order!"
            );
        }
    };

    const handleDiscountShow = () => {
        dispatch(changeDiscountCode(""));
        setShowDiscountInput(!showDiscountInput);
    };

    const handleChangeCode = (event) => {
        dispatch(changeDiscountCode(event.target.value));
    };

    const handleApplyDiscountCode = () => {
        doCheckDiscount(discountCode);

        dispatch(changeDiscountCode(""));
        setShowDiscountInput(false);
    };

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
                className="flex justify-center items-center bg-white h-10 text-red-main font-bold hover:bg-gray-100 md:w-56"
                disabled={paymentLoading || itemsCount <= 0}
            >
                {paymentLoading ? (
                    <GoSync className="text-2xl animate-spin" />
                ) : (
                    <div>CHECKOUT NOW</div>
                )}
            </button>
            {showDiscountInput ? (
                <div className="flex flex-col space-y-2 pt-2">
                    <input
                        type="text"
                        value={discountCode}
                        onChange={handleChangeCode}
                        placeholder="Discount Code"
                        className="w-full text-black"
                    />
                    <div className="flex flex-row justify-between text-white text-sm">
                        <button
                            onClick={handleDiscountShow}
                            disabled={isChecking}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApplyDiscountCode}
                            disabled={isChecking}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            ) : (
                <button onClick={handleDiscountShow} className="text-sm">
                    I have a discount code
                </button>
            )}
        </div>
    );
};

export default CartTotal;
