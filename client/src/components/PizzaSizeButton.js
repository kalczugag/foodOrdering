const PizzaSizeButton = ({ data, index, priceFn, currentIndex }) => {
    const activeClassName = currentIndex === index ? "font-bold" : "";

    return (
        <button key={index} className="relative" onClick={() => priceFn(index)}>
            <img
                width={data.size.width}
                height={data.size.height}
                src={require("../utils/svg/pizzaSize.svg").default}
                alt={data.label}
            />
            <div
                className={`absolute top-0 -right-8 color text-white text-sm rounded-xl px-2 ${activeClassName}`}
            >
                {data.label}
            </div>
        </button>
    );
};

export default PizzaSizeButton;
