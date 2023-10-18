import "../../utils/styles/carousel.css";
import { useState, useEffect, useRef } from "react";
import { useTitle } from "../../hooks/use-title";
import {
    MdOutlineNavigateBefore,
    MdOutlineNavigateNext,
    MdKeyboardArrowDown,
} from "react-icons/md";
import CarouselFirst from "../../components/CarouselFirst";
import CarouselSecond from "../../components/CarouselSecond";
import CarouselThird from "../../components/CarouselThrid";
import Slider from "react-slick";

const pages = [<CarouselFirst />, <CarouselSecond />, <CarouselThird />];

const CustomPrevArrow = ({ onClick, isVisible }) => {
    return (
        <div
            className={`custom-arrow ${isVisible ? "visible" : "hidden"}`}
            onClick={onClick}
        >
            <MdOutlineNavigateBefore className="cursor-pointer text-9xl" />
        </div>
    );
};

const CustomNextArrow = ({ onClick, isVisible }) => {
    return (
        <div
            className={`custom-arrow ${isVisible ? "visible" : "hidden"}`}
            onClick={onClick}
        >
            <MdOutlineNavigateNext className="cursor-pointer text-9xl" />
        </div>
    );
};

const HomeCarouselContainer = ({ targetRef }) => {
    useTitle("Home Pizza");
    const [arrowsVisible, setarrowsVisible] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setarrowsVisible(window.innerWidth >= 1024);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scrollToTarget = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        lazyload: "progressive",
        prevArrow: <CustomPrevArrow isVisible={arrowsVisible} />,
        nextArrow: <CustomNextArrow isVisible={arrowsVisible} />,
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-12 bg-red-main h-screen-fit text-white md:space-y-0 md:w-full">
            <Slider
                {...settings}
                className="flex flex-row justify-center items-center w-full px-8"
            >
                {pages.map((page, index) => (
                    <div key={index}>{page}</div>
                ))}
            </Slider>
            <button onClick={scrollToTarget} className="md:hidden">
                <MdKeyboardArrowDown className="text-9xl" />
            </button>
        </div>
    );
};

export default HomeCarouselContainer;
