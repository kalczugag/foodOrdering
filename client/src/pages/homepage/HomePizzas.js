import { useSelector } from "react-redux";
import MainProductItem from "../../components/MainProductsItem";

const HomePizzas = () => {
    const data = useSelector((state) => state.products.data) || [];

    const renderedFeaturedPizzas = data.map((pizza) => {
        return <MainProductItem key={pizza._id} data={pizza} />;
    });

    return (
        <div className="relative container flex flex-col items-center mx-auto min-h-screen mt-16 px-6 md:px-10">
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
