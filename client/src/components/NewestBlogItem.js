import { Link } from "react-router-dom";
import DateUtils from "../utils/functions/formatDate";

const NewestBlogItem = ({ data }) => {
    return (
        <div className="col-span-5">
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-6">
                <img
                    className="h-60 rounded-md shadow-xl xl:h-72"
                    src={data.img}
                    alt={data.title}
                />
                <div className="flex flex-col space-y-2 h-60">
                    <p className="text-sm text-gray-600">
                        {DateUtils.formatDateFromMongoDB(data.createdAt)}
                    </p>
                    <Link
                        to={`/blog/${data._id}`}
                        className="text-3xl font-semibold leading-8 xl:w-1/3 hover:underline"
                    >
                        {data.title}
                    </Link>
                    <p className="leading-5 overflow-hidden overflow-ellipsis xl:w-1/2">
                        {data.desc}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewestBlogItem;
