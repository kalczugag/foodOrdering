import { Link } from "react-router-dom";
import DateUtils from "../utils/functions/formatDate";

const BlogItem = ({ data }) => {
    return (
        <div className="relative flex flex-col">
            <img
                className="h-32 object-cover rounded-md shadow-md xl:h-40"
                src={data.img}
                alt={data.title}
            />
            <div className="flex flex-col space-y-2 mt-2">
                <p className="text-xs text-gray-600">
                    {DateUtils.formatDateFromMongoDB(data.createdAt)}
                </p>
                <Link
                    to={`/blog/${data._id}`}
                    className="text-xl font-semibold leading-5 hover:underline"
                >
                    {data.title}
                </Link>
                <p className="h-24 leading-5 overflow-hidden overflow-ellipsis">
                    {data.desc}
                </p>
            </div>
        </div>
    );
};

export default BlogItem;
