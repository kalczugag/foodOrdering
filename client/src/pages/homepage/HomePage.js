import { useTitle } from "../../hooks/use-title";
import HomeCarouselContainer from "./HomeCarouselContainer";
import HomePizzas from "./HomePizzas";

const Home = () => {
    useTitle("Home");

    return (
        <>
            <HomeCarouselContainer />
            <HomePizzas />
        </>
    );
};

export default Home;
