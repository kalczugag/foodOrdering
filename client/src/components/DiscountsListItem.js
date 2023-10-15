import "../utils/styles/discount.css";
import { useState } from "react";
import { useThunk } from "../hooks/use-thunk";
import { removeDiscount } from "../store";
import { AiOutlineCopy } from "react-icons/ai";

const DiscountsListItem = ({ data: { _id, code, amount, expiresAt } }) => {
    const [showCode, setShowCode] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [doRemoveDiscount, isRemovingDiscount] = useThunk(removeDiscount);
    const amountInPercent = amount * 100;

    const handleRemoveDiscount = (id) => {
        doRemoveDiscount(id);
    };

    const handleShowCode = () => {
        setShowCode(!showCode);
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    let displayCode = code;
    if (code.length > 10) {
        displayCode = `${code.slice(0, 8)}...`;
    }

    return (
        <div className="flex flex-row space-x-12 p-2 max-w-sm rounded shadow-md border-2 border-red-main">
            <div className="flex flex-col space-y-2">
                <div className="font-bold">{amountInPercent}% promo</div>
                <div>Up to {amountInPercent}% on every product in store.</div>
            </div>
            <div className="flex flex-col space-y-2">
                <button
                    onClick={showCode ? handleCopyCode : handleShowCode}
                    className={`relative bg-red-main text-white rounded-3xl p-2 px-6 ${
                        showCode && "outline-dotted outline-3 outline-red-main"
                    } ${isCopied && "copy-animation"}`}
                >
                    {showCode ? (
                        <div className="flex items-center justify-between">
                            {displayCode} <AiOutlineCopy />
                        </div>
                    ) : (
                        "See Code"
                    )}
                </button>
                <p className="text-sm font-semibold">
                    Coupon expires at {expiresAt}
                </p>
            </div>
        </div>
    );
};

export default DiscountsListItem;
