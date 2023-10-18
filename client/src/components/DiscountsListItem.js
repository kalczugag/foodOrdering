import "../utils/styles/discount.css";
import { useState, useEffect } from "react";
import { useThunk } from "../hooks/use-thunk";
import { useUser } from "../hooks/use-user";
import { removeDiscount } from "../store";
import { AiOutlineCopy } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

const DiscountsListItem = ({ data: { _id, code, amount, expiresAt } }) => {
    const [showCode, setShowCode] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [showButtons, setShowButtons] = useState(false);

    const { admin } = useUser();
    const [doRemove, isRemoving] = useThunk(removeDiscount);
    const amountInPercent = amount * 100;

    useEffect(() => {
        const handleWindowSize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleWindowSize);

        return () => {
            window.removeEventListener("resize", handleWindowSize);
        };
    }, []);

    const handleRemove = () => {
        doRemove(_id);
    };

    const handleShowCode = () => {
        setShowCode(!showCode);
    };

    const handleCopy = () => {
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

    const isMobile = width <= 768;

    return (
        <div className="flex flex-row p-2 max-w-sm rounded shadow-md border-2 border-red-main">
            <div className="flex flex-col space-y-2">
                <div className="font-bold">{amountInPercent}% promo</div>
                <div>Up to {amountInPercent}% on every product in store.</div>
            </div>
            <div className="flex flex-col space-y-2 ml-6">
                <button
                    onClick={showCode && isMobile ? handleCopy : handleShowCode}
                    className={`relative bg-red-main text-white rounded-3xl p-2 px-6 ${
                        showCode && "outline-dotted outline-3 outline-red-main"
                    } ${isCopied && "copy-animation"} xl:w-32`}
                >
                    {showCode ? (
                        <div
                            onMouseEnter={() => setShowButtons(true)}
                            onMouseLeave={() => setShowButtons(false)}
                            className="flex items-center justify-center"
                        >
                            {showButtons && (
                                <div className="flex flex-row items-center space-x-2 py-1">
                                    <button onClick={handleCopy}>
                                        <AiOutlineCopy />
                                    </button>
                                    <button onClick={handleRemove}>
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            )}
                            {showButtons || displayCode}
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
