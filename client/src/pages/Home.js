const Home = () => {
    return (
        <div className="w-screen h-screen bg-red-main flex flex-row items-center justify-between text-white">
            <div className="flex flex-col text-3xl font-bold mx-40">
                <div className="flex flex-col items-center mb-6">
                    <p>HOT & SPICY</p>
                    <h1 className="text-8xl">PIZZA</h1>
                    <div className="pt-4 w-12 border-b-4 border-white" />
                </div>
                <div className="flex flex-col items-center text-4xl">
                    <p className="border-b-2 border-white pb-1">50% OFF</p>
                    <p className="text-2xl border-b-2 border-white pb-1">
                        ORDER NOW
                    </p>
                    <p className="text-xl">LAMA</p>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Home;
