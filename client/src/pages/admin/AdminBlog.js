import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThunk } from "../../hooks/use-thunk";
import { usePaginate } from "../../hooks/use-paginate";
import { useUser } from "../../hooks/use-user";
import { fetchPosts, removePost } from "../../store";
import DateUtils from "../../utils/functions/formatDate";
import SortableTable from "../../components/SortableTable";
import PaginationContainer from "../../components/PaginationConatiner";

const AdminBlog = () => {
    const navigate = useNavigate();

    const [doFetchPosts, isFetchingPosts] = useThunk(fetchPosts);
    const [doRemovePost, isRemovingPost] = useThunk(removePost);
    const [currentPage, setCurrentPage] = useState(1);

    const [paginatedData, totalPages] = usePaginate(
        "blog.data",
        5,
        currentPage
    );

    const { admin } = useUser();

    useEffect(() => {
        if (admin && paginatedData.length <= 0 && !isFetchingPosts)
            doFetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchPosts, paginatedData]);

    const config = [
        {
            label: "Image",
            render: (post) => (
                <img
                    className="h-20 object-contain md:object-cover"
                    src={post.img}
                    alt={post.title}
                />
            ),
        },
        { label: "Title", render: (post) => post.title },
        { label: "Description", render: (post) => post.desc },
        {
            label: "Created at",
            render: (post) => DateUtils.formatTimestamp(post.createdAt),
            sortValue: (post) => post.createdAt,
        },
        {
            label: "Action",
            render: (post) => (
                <div className="flex flex-col items-center text-white md:space-x-2 md:flex-row">
                    <button
                        onClick={() => navigate(`edit/${post._id}`)}
                        className="w-full color p-1 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleRemovePost(post)}
                        className="w-full bg-red-main p-1 rounded"
                        disabled={isRemovingPost}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const handleRemovePost = (post) => {
        doRemovePost(post);
    };

    const keyFn = (data) => {
        return data.id;
    };

    return (
        <div className="flex flex-col p-10 space-y-4">
            <h1 className="text-3xl font-bold">Blog Posts</h1>
            <SortableTable config={config} data={paginatedData} keyFn={keyFn} />
            <PaginationContainer
                setPage={setCurrentPage}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </div>
    );
};

export default AdminBlog;
