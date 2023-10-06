import { useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import CarouselFirst from "../../components/CarouselFirst";
import CarouselSecond from "../../components/CarouselSecond";
import CarouselThird from "../../components/CarouselThrid";
import { useTitle } from "../../hooks/use-title";

const pages = [<CarouselFirst />, <CarouselSecond />, <CarouselThird />];

const HomeCarouselContainer = () => {
    useTitle("Home Pizza");
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < pages.length) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="bg-red-main flex flex-col justify-between items-center px-6 h-screen-fit text-white md:flex-row md:w-full xl:px-0">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="hidden xl:flex xl:justify-start"
            >
                <MdOutlineNavigateBefore className="cursor-pointer text-9xl" />
            </button>
            <div>{pages[currentPage]}</div>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="hidden xl:flex xl:justify-end"
            >
                <MdOutlineNavigateNext className="cursor-pointer text-9xl" />
            </button>
        </div>
    );
};

export default HomeCarouselContainer;
