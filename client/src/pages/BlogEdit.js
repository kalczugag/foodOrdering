import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useNavigate, useParams } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { useTitle } from "../hooks/use-title";
import { editPost } from "../store";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { convertToBase64 } from "../utils/functions/convertToBase64";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

const BlogNew = () => {
    useTitle("New Post");
    const { postId } = useParams();
    const navigate = useNavigate();
    const post = useSelector((state) => {
        return state.blog.data.find((e) => e._id === postId) || null;
    });
    const [doEditPost, isPostEditing] = useThunk(editPost);

    const [initialValues, setInitialValues] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowSize = () => {
            setWidth(window.innerWidth);
        };

        setInitialValues({
            title: post.title,
            desc: post.desc,
        });

        window.addEventListener("resize", handleWindowSize);

        return () => {
            window.removeEventListener("resize", handleWindowSize);
        };
    }, [post]);

    const onSubmit = async (values) => {
        const isFormChanged = !isEqual(initialValues, values);
        if (isFormChanged || imageFile !== null) {
            try {
                const modifiedValues = {
                    ...values,
                    _id: postId,
                };

                await doEditPost([modifiedValues, imageFile]);
                navigate("/admin/blog");
            } catch (err) {
                console.error(err);
            }
        } else {
            alert("Form values have not changed.");
        }
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertToBase64(file);
        setImageFile(base64);
    };

    const required = (value) => (value ? undefined : "Required");

    const isMobile = width <= 768;

    return (
        <div className="flex justify-center p-4 md:p-10">
            <Form
                onSubmit={onSubmit}
                initialValues={{ title: post.title, desc: post.desc }}
                render={({ handleSubmit, form: { getState } }) => (
                    <form
                        id="myForm"
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4"
                    >
                        <h1 className="font-bold text-3xl">Create Post</h1>
                        <div className="relative flex flex-col border shadow-md">
                            <Field
                                className="text-2xl border-0 border-b-2 border-gray-300 rounded-none w-full outline-gray-500 -outline-offset-2"
                                type="text"
                                component="input"
                                name="title"
                                placeholder="Title"
                                validate={required}
                            />
                            <Field
                                className="p-2 outline-none focus:outline-gray-500 -outline-offset-2"
                                component="textarea"
                                name="desc"
                                placeholder="Description (no more than 400 words)"
                                maxlength={400}
                                rows={6}
                                cols={isMobile ? 43 : 75}
                                style={{ resize: "none" }}
                                validate={required}
                            />
                            <div className="relative flex flex-row p-2 py-3 bg-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowInput(!showInput)}
                                    className="flex flex-row items-center justify-center space-x-1 hover:text-gray-500"
                                >
                                    {showInput ? (
                                        <ImCross className="text-red-main" />
                                    ) : (
                                        <AiOutlinePlus className="text-green-main" />
                                    )}
                                    <p>
                                        {showInput ? "Close" : "Add Pictures"}
                                    </p>
                                </button>
                                <div
                                    className={`top-2.5 left-32 ${
                                        showInput ? "absolute" : "hidden"
                                    }`}
                                >
                                    <input
                                        className="input-initial"
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className={`flex ${
                                showInput ? "justify-between" : "justify-end"
                            } h-12`}
                        >
                            <div className="flex flex-col">
                                {showInput && (
                                    <>
                                        <p className="field-label">
                                            current image
                                        </p>
                                        <img
                                            className="h-20 border-2"
                                            src={
                                                imageFile ? imageFile : post.img
                                            }
                                            alt={post.title}
                                        />
                                    </>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="color text-white rounded p-1 px-6 mt-4"
                                disabled={getState().invalid || isPostEditing}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            />
        </div>
    );
};

export default BlogNew;
