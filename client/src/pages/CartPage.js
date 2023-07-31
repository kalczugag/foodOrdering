import { useSelector } from "react-redux";
import CartList from "../components/CartList";
import CartTotal from "../components/CartTotal";

const Cart = () => {
    const data = useSelector((state) => state.cart);

    return (
        <div className="flex flex-col p-14 px-16 justify-between space-y-6 md:space-y-0 md:flex-row">
            <CartList data={data} />
            <CartTotal data={data} />
        </div>
    );
};

export default Cart;
