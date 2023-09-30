import { useEffect } from "react";
import { useTitle } from "../hooks/use-title";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { fetchPosts } from "../store";
import { useUser } from "../hooks/use-user";
import NewestBlogItem from "../components/NewestBlogItem";
import BlogItem from "../components/BlogItem";
import PostsSkeleton from "../components/PostsSkeleton";

const Blog = () => {
    const data = useSelector((state) => state.blog.data);

    const { user } = useUser();
    const admin = user && user.admin;

    const [doFetchPosts, isLoadingPosts] = useThunk(fetchPosts);

    useTitle("Blog");

    useEffect(() => {
        doFetchPosts();
    }, [doFetchPosts]);

    const renderedBlogItems = data.map((post, index) => {
        if (index !== 0) {
            return <BlogItem data={post} key={post._id} />;
        }

        return <NewestBlogItem data={post} key={post._id} />;
    });

    return (
        <div className="flex items-center">
            <div className="p-10 space-y-12">
                <h1 className="text-5xl font-bold">
                    The Blog
                    {admin && (
                        <Link to="new" className="ml-3 text-red-main text-xl">
                            Add new
                        </Link>
                    )}
                </h1>
                <div className="grid grid-cols-3 gap-x-6 md:gap-8 xl:grid-cols-5">
                    {isLoadingPosts ? (
                        <PostsSkeleton />
                    ) : data && data.length > 0 ? (
                        renderedBlogItems
                    ) : (
                        <div className="text-xl font-bold">
                            There are no posts
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blog;
