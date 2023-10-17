const CarouselFirst = () => {
    return (
        <div className="grid grid-flow-row items-center justify-center md:grid-cols-2">
            <div className="flex flex-col text-3xl font-bold mt-2 md:mt-0">
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
            <div className="hidden md:block md:w-full">
                <img src="/images/1.png" alt="pizza" />
            </div>
        </div>
    );
};

export default CarouselFirst;
