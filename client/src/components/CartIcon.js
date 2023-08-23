import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = () => {
    const { itemsCount } = useSelector((state) => state.cart);

    return (
        <Link to="/cart" className="relative">
            <AiOutlineShoppingCart />
            {itemsCount === 0 ? (
                ""
            ) : (
                <div className="absolute -top-3 -right-3 flex items-center justify-center w-5 h-5 rounded-full bg-white font-semibold text-black text-sm">
                    {itemsCount}
                </div>
            )}
        </Link>
    );
};

export default Cart;
