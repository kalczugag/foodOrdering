import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useTitle } from "../hooks/use-title";
import { AiOutlinePlus } from "react-icons/ai";

const BlogNew = () => {
    const [imageFile, setImageFile] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useTitle("New Post");

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "Are you sure you want to leave this page?";
        };

        const handleWindowSize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("resize", handleWindowSize);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("resize", handleWindowSize);
        };
    }, []);

    const onSubmit = (values) => {
        console.log(values);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const required = (value) => (value ? undefined : "Required");

    const isMobile = width <= 768;

    return (
        <div className="flex justify-center p-10">
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form: { getState } }) => (
                    <form
                        id="myForm"
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4"
                    >
                        <h1 className="font-bold text-3xl">Create Post</h1>
                        {/* <div>
                            <label className="field-label">
                                Choose an Image (use image{" "}
                                <a
                                    href="https://imagecompressor.com/"
                                    className="field-label underline text-gray-600 hover:text-gray-500"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    compressor
                                </a>
                                )
                            </label>
                            <input
                                className="input-initial"
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                accept="image/*" // Optional: restrict to image files if needed
                                required // Optional: add the required attribute if needed
                            />
                        </div> */}

                        <div className="relative flex flex-col border shadow-md">
                            <Field
                                className="text-2xl border-0 border-b-2 border-gray-300 rounded-none w-full outline-none focus:border-l-2"
                                type="text"
                                component="input"
                                name="title"
                                placeholder="Title"
                                validate={required}
                            />
                            <Field
                                className="p-2 outline-none focus:border-gray-main"
                                component="textarea"
                                name="desc"
                                placeholder="Description (no more than 150 words)"
                                maxlength={150}
                                rows={6}
                                cols={isMobile ? 50 : 75}
                                validate={required}
                            />
                            <div className="relative flex flex-row p-2 py-3 bg-gray-200">
                                <button className="flex flex-row items-center justify-center space-x-1 hover:text-gray-500">
                                    <AiOutlinePlus className="text-green-main" />
                                    <p>Add Pictures</p>
                                </button>
                                <div className={`hidden `}>
                                    <input
                                        className="input-initial"
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                        accept="image/*" // Optional: restrict to image files if needed
                                        required // Optional: add the required attribute if needed
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => onSubmit(getState().values)}
                                className="color text-white rounded p-1 px-6 mt-4"
                                disabled={getState().invalid}
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
