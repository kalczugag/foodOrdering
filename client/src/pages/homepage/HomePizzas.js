import { Link } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import { useSelector } from "react-redux";

const HomePizzas = () => {
    const user = useUser();

    const data = useSelector((state) => state.products.data) || [];

    const renderedFeaturedPizzas = data.map((pizza) => {
        return (
            <Link
                key={pizza.title}
                to={`/products/${pizza._id}`}
                className="flex flex-col items-center space-y-1"
            >
                <img className="md:w-3/4" src={pizza.img} alt={pizza.title} />
                <p className="text-red-500 text-xl border-b border-white hover:border-red-main">
                    {pizza.title}
                </p>
                <p className="font-bold">
                    ${pizza.price[0]} - ${pizza.price[2]}
                </p>
                <p>{pizza.desc}</p>
            </Link>
        );
    });

    return (
        <div className="relative container flex flex-col items-center mx-auto min-h-screen mt-16 px-6 md:px-10">
            {user && user.admin && (
                <button className="hidden absolute -top-8 left-0 rounded-xl bg-blue-500 text-white p-2 md:block">
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
