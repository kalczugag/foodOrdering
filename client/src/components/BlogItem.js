import { Link } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { useUser } from "../hooks/use-user";
import { removePost } from "../store";
import DateUtils from "../utils/functions/formatDate";
import { FaRegTrashAlt } from "react-icons/fa";

const BlogItem = ({ data }) => {
    const [doRemovePost, isRemoveLoading] = useThunk(removePost);

    const { user } = useUser();
    const admin = user && user.admin;

    const handleRemovePost = () => {
        doRemovePost(data);
    };

    return (
        <div className="relative flex flex-col">
            {admin && (
                <button
                    onClick={handleRemovePost}
                    className="relative -top-2 -right-2 z-10 text-2xl bg-white rounded p-1 opacity-80 md:absolute"
                    disabled={isRemoveLoading}
                >
                    <FaRegTrashAlt />
                </button>
            )}
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
