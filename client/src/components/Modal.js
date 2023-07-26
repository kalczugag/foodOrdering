import ReactDOM from "react-dom";
import { useEffect } from "react";
import { ImCross } from "react-icons/im";

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");

        return () => document.body.classList.remove("overflow-hidden");
    }, []);

    return ReactDOM.createPortal(
        <div>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-gray-300 opacity-60 z-50"
            ></div>
            <div className="fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-full p-10 bg-white rounded-3xl shadow-md">
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-black rounded-full flex justify-center items-center text-white"
                >
                    <ImCross className="text-sm" />
                </button>
                <div className="flex flex-col justify-between h-full">
                    {children}
                </div>
            </div>
        </div>,
        document.querySelector(".modal-container")
    );
};

export default Modal;
