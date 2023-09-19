import { useState } from "react";
import { useTitle } from "../hooks/use-title";
import { useUser } from "../hooks/use-user";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import NewestBlogItem from "../components/NewestBlogItem";
import BlogItem from "../components/BlogItem";

const Blog = () => {
    useTitle("Blog");
    const { user } = useUser();

    const admin = user && user.admin;

    return (
        <div className="flex justify-center items-center">
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
                    <NewestBlogItem />
                    <BlogItem />
                    <BlogItem />
                    <BlogItem />
                </div>
            </div>
        </div>
    );
};

export default Blog;
