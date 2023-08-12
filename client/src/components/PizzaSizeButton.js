const PizzaSizeButton = ({ size, index, priceFn, currentIndex }) => {
    const activeClassName = currentIndex === index ? "font-bold" : "";

    return (
        <button key={index} className="relative" onClick={() => priceFn(index)}>
            <img
                className={size.className}
                src={require("../utils/images/size.png")}
                alt="size"
            />
            <div
                className={`absolute top-0 -right-8 color text-white text-sm rounded-xl px-2 ${activeClassName}`}
            >
                {size.label}
            </div>
        </button>
    );
};

export default PizzaSizeButton;
