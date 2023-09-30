import { Link } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { useUser } from "../hooks/use-user";
import { removePost } from "../store";
import DateUtils from "../utils/functions/formatDate";
import { FaRegTrashAlt } from "react-icons/fa";

const NewestBlogItem = ({ data }) => {
    const [doRemovePost, isRemoveLoading] = useThunk(removePost);

    const { user } = useUser();
    const admin = user && user.admin;

    const handleRemovePost = () => {
        doRemovePost(data);
    };

    return (
        <div className="relative col-span-5">
            {admin && (
                <button
                    onClick={handleRemovePost}
                    className="relative -top-2 -left-2 z-10 text-2xl bg-white rounded p-1 opacity-80 md:absolute"
                    disabled={isRemoveLoading}
                >
                    <FaRegTrashAlt />
                </button>
            )}
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
