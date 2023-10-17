import { useRef } from "react";
import { useTitle } from "../../hooks/use-title";
import HomeCarouselContainer from "./HomeCarouselContainer";
import HomePizzas from "./HomePizzas";

const Home = () => {
    useTitle("Home");
    const pizzasRef = useRef(null);

    return (
        <>
            <HomeCarouselContainer targetRef={pizzasRef} />
            <HomePizzas ref={pizzasRef} />
        </>
    );
};

export default Home;
