import { useTitle } from "../hooks/use-title";

const BlogNew = () => {
    useTitle("New Post");

    return <div className="flex flex-col"></div>;
};

export default BlogNew;
