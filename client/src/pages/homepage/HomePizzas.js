import { useSelector } from "react-redux";

const HomePizzas = () => {
    const { data } = useSelector((state) => state.auth);

    const config = [
        {
            label: "Sicilian",
            price: "$14",
            description: "description",
            src: require("../../utils/images/pizza.png"),
        },
        {
            label: "Neapolitan",
            price: "$18",
            description: "description",
            src: require("../../utils/images/pizza.png"),
        },
        {
            label: "Chicago",
            price: "$18",
            description: "description",
            src: require("../../utils/images/pizza.png"),
        },
        {
            label: "California",
            price: "$15",
            description: "description",
            src: require("../../utils/images/pizza.png"),
        },
        {
            label: "Detroit",
            price: "$16",
            src: require("../../utils/images/pizza.png"),
        },
        {
            label: "St. Louis",
            price: "$13",
            description: "description",
            src: require("../../utils/images/pizza.png"),
        },
        {
            label: "Carloza",
            price: "$15",
            description: "description",
            src: require("../../utils/images/pizza.png"),
        },
        {
            label: "Aegean",
            price: "$18",
            description: "description",
            src: require("../../utils/images/pizza.png"),
        },
    ];

    const renderedFeaturedPizzas = config.map((pizza) => {
        return (
            <a href="/" className="flex flex-col items-center space-y-1">
                <img src={pizza.src} alt={pizza.label} />
                <p className="text-red-500">{pizza.label}</p>
                <p className="font-bold">{pizza.price}</p>
                <p>{pizza.description}</p>
            </a>
        );
    });

    return (
        <div className="relative container flex flex-col items-center mx-auto min-h-screen mt-16 px-6 md:px-0">
            {data.admin && (
                <button className="absolute -top-8 -left-20 rounded-xl bg-blue-500 text-white p-2">
                    Add pizza
                </button>
            )}
            <h1 className="text-3xl font-bold mb-10 md:text-4xl">
                THE BEST PIZZA IN TOWN
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                molestiae sit temporibus harum atque libero! Dicta dolorem iusto
                obcaecati. Quo corporis quaerat iusto enim minima rem possimus
                nihil maxime molestiae.
            </p>
            <div className="grid gap-16 grid-cols-2 mt-10 md:grid-cols-3 xl:grid-cols-4">
                {renderedFeaturedPizzas}
            </div>
        </div>
    );
};

export default HomePizzas;
