import { useEffect } from "react";
import { useTitle } from "../hooks/use-title";
import { useParams } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { fetchPost } from "../store";

const PostDetails = ({ data }) => {
    const { postId } = useParams();
    const [doFetchPost] = useThunk(fetchPost);

    useTitle("Post");

    useEffect(() => {
        doFetchPost();
    }, [doFetchPost]);

    return <div></div>;
};

export default PostDetails;
