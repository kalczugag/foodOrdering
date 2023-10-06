import ImageComponent from "./ImageComponent";

const CarouselFirst = () => {
    return (
        <div className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0">
            <div className="flex flex-col text-3xl font-bold mt-2 md:mr-32 md:mt-0">
                <div className="flex flex-col items-center mb-6">
                    <p>HOT & SPICY</p>
                    <h1 className="text-8xl md:text-9xl">PIZZA</h1>
                    <div className="pt-4 w-12 border-b-4 border-white" />
                </div>
                <div className="flex flex-col items-center text-4xl">
                    <p className="border-b-2 border-white pb-1">50% OFF</p>
                    <p className="text-2xl border-b-2 border-white pb-1">
                        ORDER NOW
                    </p>
                    <p className="text-xl pt-1">{process.env.NODE_ENV}</p>
                </div>
            </div>
            <div className="w-1/2 md:w-full">
                <ImageComponent imageUrl={"1.png"} />
            </div>
        </div>
    );
};

export default CarouselFirst;
