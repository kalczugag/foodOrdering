import { useSelector } from "react-redux";
import HomeFooter from "./homepage/HomeFooter";
import CartList from "../components/CartList";
import CartTotal from "../components/CartTotal";

const Cart = () => {
    const { items, totalPrice } = useSelector((state) => state.cart);

    return (
        <div className="flex flex-col">
            <div></div>
            <CartList items={items} />
            <CartTotal totalPrice={totalPrice} />
            <HomeFooter />
        </div>
    );
};

export default Cart;
