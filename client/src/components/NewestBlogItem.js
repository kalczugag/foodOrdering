import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const NewestBlogItem = () => {
    const loading = true;

    return (
        <div className="flex-grow col-span-5">
            {!loading ? (
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-6">
                    <img
                        className="h-60 rounded-md shadow-xl xl:h-72"
                        src={require("../utils/images/mike-dorner-sf_1ZDA1YFw-unsplash.jpg")}
                        alt="img"
                    />
                    <div className="flex flex-col space-y-2 h-60">
                        <p className="text-sm text-gray-600">March 05, 2021</p>
                        <Link
                            to="/blog"
                            className="text-3xl font-semibold leading-8 xl:w-1/3 hover:underline"
                        >
                            Tentang Creativity Block pada UI Designer
                        </Link>
                        <p className="leading-5 overflow-hidden overflow-ellipsis xl:w-1/2">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Mollitia obcaecati velit quos consectetur
                            numquam,
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-6">
                    <Skeleton height="240px" width="23vw" />
                    <div className="flex flex-col space-y-2 w-full xl:w-1/3">
                        <Skeleton height={20} />
                        <Skeleton height={65} />
                        <Skeleton height={65} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewestBlogItem;
