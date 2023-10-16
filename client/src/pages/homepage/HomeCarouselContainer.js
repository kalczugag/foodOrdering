import { useTitle } from "../../hooks/use-title";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import CarouselFirst from "../../components/CarouselFirst";
import CarouselSecond from "../../components/CarouselSecond";
import CarouselThird from "../../components/CarouselThrid";
import Slider from "react-slick";

const pages = [<CarouselFirst />, <CarouselSecond />, <CarouselThird />];

const CustomPrevArrow = ({ onClick }) => {
    return (
        <div className="custom-arrow" onClick={onClick}>
            <MdOutlineNavigateBefore className="cursor-pointer text-9xl" />
        </div>
    );
};

const CustomNextArrow = ({ onClick }) => {
    return (
        <div className="custom-arrow" onClick={onClick}>
            <MdOutlineNavigateNext className="cursor-pointer text-9xl" />
        </div>
    );
};

const HomeCarouselContainer = () => {
    useTitle("Home Pizza");

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <div className="flex justify-center items-center bg-red-main h-screen-fit text-white md:w-full">
            <Slider
                {...settings}
                className="flex flex-row justify-center items-center w-full px-8"
            >
                {pages.map((page, index) => (
                    <div key={index}>{page}</div>
                ))}
            </Slider>
        </div>
    );
};

export default HomeCarouselContainer;
