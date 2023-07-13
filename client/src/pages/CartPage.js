import { useSelector } from "react-redux";
import CartList from "../components/CartList";
import CartTotal from "../components/CartTotal";

const Cart = () => {
    const data = useSelector((state) => state.cart);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row p-14 px-16 justify-between">
                <CartList data={data} />
                <CartTotal data={data} />
            </div>
        </div>
    );
};

export default Cart;
