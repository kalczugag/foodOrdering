import { useTitle } from "../../hooks/use-title";
import HomeMain from "./HomeMain";
import HomePizzas from "./HomePizzas";

const Home = () => {
    useTitle("Home");

    return (
        <>
            <HomeMain />
            <HomePizzas />
        </>
    );
};

export default Home;
