const HomeFooter = () => {
    const config = [
        {
            address: "1654 R. Don Road #304",
            city: "NewYork",
            postal: "85022",
            phone: "(602) 867-1010",
        },
        {
            address: "2356 K. Laquie Rd #235",
            city: "NewYork",
            postal: "85022",
            phone: "(602) 867-1011",
        },
        {
            address: "1614 E. Erwin St #104",
            city: "NewYork",
            postal: "85022",
            phone: "(602) 867-1012",
        },
        {
            address: "1614 W. Caroll St #125",
            city: "NewYork",
            postal: "85022",
            phone: "(602) 867-1013",
        },
    ];

    const renderedAddresses = config.map(
        ({ address, city, postal, phone }, index) => {
            return (
                <div key={index} className="text-lg mt-4">
                    <p>{address}.</p>
                    <p>
                        {city}, {postal}
                    </p>
                    <p>{phone}</p>
                </div>
            );
        }
    );

    return (
        <div className="flex flex-row bg-gray-main mt-16 text-white md:h-screen-fit">
            <div className="hidden md:block">
                <img
                    className="h-screen-fit object-cover"
                    src={require("../../utils/images/bg.png")}
                    alt="bg"
                />
            </div>
            <div className="flex flex-col justify-between p-20 md:flex-row md:space-x-4 xl:space-x-0">
                <div className="text-center pb-10 md:w-1/4 md:pb-0 md:text-start">
                    <h2 className="text-4xl font-bold">
                        OH YES, WE DID. THE LAMA PIZZA, WELL BAKED SLICE OF
                        PIZZA
                    </h2>
                </div>
                <div className="flex flex-row justify-evenly flex-1 sm:space-x-7 md:space-x-4 xl:space-x-0">
                    <div>
                        <h3 className="text-xl font-bold text-yellow-500">
                            FIND OUR RESTAURANTS
                        </h3>
                        <div className="flex flex-col space-y-4">
                            {renderedAddresses}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-yellow-500">
                            WORKING HOURS
                        </h3>
                        <div className="flex flex-col space-y-4">
                            <div className="text-lg mt-4">
                                <p>MONDAY UNTIL FRIDAY</p>
                                <p>9:00 - 22:00</p>
                            </div>
                            <div className="text-lg mt-4">
                                <p>SATURDAY - SUNDAY</p>
                                <p>12:00 - 24:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeFooter;
