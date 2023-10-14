import { useThunk } from "../hooks/use-thunk";
import { removeDiscount } from "../store";

const DiscountsListItem = ({ data: { _id, code, amount, expiresAt } }) => {
    const [doRemoveDiscount, isRemovingDiscount] = useThunk(removeDiscount);

    const amountInPercent = amount * 100;

    const handleRemoveDiscount = (id) => {
        doRemoveDiscount(id);
    };

    return (
        <div className="flex flex-row space-x-12 p-2 w-96 rounded shadow-md border-2 border-red-main">
            <div className="flex flex-col space-y-2">
                <div>{amountInPercent}% promo</div>
                <div>Up to {amountInPercent}% on every product in store.</div>
            </div>
            <div className="flex flex-col space-y-2">
                <button className="bg-red-main text-white rounded-3xl p-2 px-6">
                    See Code
                </button>
                <p className="text-sm">Coupon expires at {expiresAt}</p>
            </div>
        </div>
    );
};

export default DiscountsListItem;
