import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const BlogItem = () => {
    const loading = true;

    return (
        <div className="flex-grow">
            {!loading ? (
                <div className="flex flex-col">
                    <img
                        className="h-32 object-cover rounded-md shadow-md xl:h-40"
                        src={require("../utils/images/mike-dorner-sf_1ZDA1YFw-unsplash.jpg")}
                        alt="img"
                    />
                    <div className="flex flex-col space-y-2 mt-2">
                        <p className="text-xs text-gray-600">March 05, 2021</p>
                        <Link
                            to="/blog"
                            className="text-xl font-semibold leading-5 hover:underline"
                        >
                            Tentang Creativity Block pada UI Designer
                        </Link>
                        <p className="h-24 leading-5 overflow-hidden overflow-ellipsis">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Mollitia obcaecati velit quos consectetur
                            numquam.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col">
                    <Skeleton height="128px" width="100%" />
                    <div className="flex flex-col space-y-2 mt-2">
                        <Skeleton height={20} />
                        <div className="w-screen" />
                        <Skeleton height={50} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogItem;
