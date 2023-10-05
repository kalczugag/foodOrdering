import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { useTitle } from "../hooks/use-title";
import { addPost } from "../store";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { convertToBase64 } from "../utils/functions/convertToBase64";

const BlogNew = () => {
    const [imageFile, setImageFile] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    useTitle("New Post");
    const navigate = useNavigate();
    const [doAddPost, isPostAdding] = useThunk(addPost);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "Are you sure you want to leave this page?";
        };

        const handleWindowSize = () => {
            setWidth(window.innerWidth);
        };

        if (!isFormSubmitted)
            window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("resize", handleWindowSize);

        return () => {
            if (!isFormSubmitted)
                window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("resize", handleWindowSize);
        };
    }, [isFormSubmitted]);

    const onSubmit = async (values) => {
        try {
            await doAddPost([values, imageFile]);
            setIsFormSubmitted(true);
            navigate("/blog");
        } catch (err) {
            console.error(err);
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
                        <div className="flex justify-end">
                            <button
                                onClick={() => onSubmit(getState().values)}
                                className="color text-white rounded p-1 px-6 mt-4"
                                disabled={getState().invalid || isPostAdding}
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
