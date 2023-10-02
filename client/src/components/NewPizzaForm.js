import "../utils/styles/pizzaForm.css";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import { useThunk } from "../hooks/use-thunk";
import { addProduct } from "../store";
import Modal from "./Modal";
import NewPizzaReview from "./NewPizzaReview";
import { convertToBase64 } from "../utils/functions/convertToBase64";

const NewPizzaForm = ({ onClose }) => {
    const [formValues, setFormValues] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [showReview, setShowReview] = useState(false);

    const [doAddProduct] = useThunk(addProduct);

    const onSubmit = (values) => {
        setFormValues(values);
        setShowReview(true);
    };

    const handleFinalSubmit = async () => {
        try {
            doAddProduct([formValues, imageFile]);
            onClose();
            setShowReview(false);
            setFormValues([]);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertToBase64(file);
        setImageFile(base64);
    };

    const required = (value) => (value ? undefined : "Required");

    return (
        <Modal onClose={onClose}>
            {!showReview ? (
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form: { getState } }) => (
                        <form
                            id="myForm"
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4"
                        >
                            <h1 className="font-bold text-3xl">
                                Add a new Pizza
                            </h1>
                            <div>
                                <label className="field-label">
                                    Choose an Image (use a{" "}
                                    <a
                                        href="https://imagecompressor.com/"
                                        className="field-label underline text-gray-600 hover:text-gray-500"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        compressor
                                    </a>{" "}
                                    first )
                                </label>
                                <input
                                    className="input-initial"
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    accept="image/*" // Optional: restrict to image files if needed
                                    required // Optional: add the required attribute if needed
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="field-label">Title</label>
                                <Field
                                    className="input-initial"
                                    type="text"
                                    component="input"
                                    name="title"
                                    validate={required}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="field-label">
                                    Description
                                </label>
                                <Field
                                    component="textarea"
                                    name="desc"
                                    className="border area-inital"
                                    validate={required}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="field-label">Prices</label>
                                <div className="flex flex-row justify-between space-x-8">
                                    <Field
                                        className="input-initial"
                                        type="number"
                                        component="input"
                                        placeholder="Small"
                                        name="smallPrice"
                                        validate={required}
                                    />
                                    <Field
                                        className="input-initial"
                                        type="number"
                                        component="input"
                                        placeholder="Medium"
                                        name="mediumPrice"
                                        validate={required}
                                    />
                                    <Field
                                        className="input-initial"
                                        type="number"
                                        component="input"
                                        placeholder="Large"
                                        name="largePrice"
                                        validate={required}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="field-label">Extras</label>
                                <Field
                                    name="extras"
                                    component="textarea"
                                    placeholder="temporary extras field"
                                    className="area-inital"
                                />
                            </div>
                            <div className="flex justify-end">
                                <div></div>
                                <div></div>
                                <button
                                    onClick={() => onSubmit(getState().values)}
                                    type="button"
                                    className="color text-white rounded p-1 px-6 mt-4"
                                    disabled={getState().invalid}
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    )}
                />
            ) : (
                <NewPizzaReview
                    formValues={formValues}
                    onEdit={() => setShowReview(false)}
                    finalSubmit={handleFinalSubmit}
                />
            )}
        </Modal>
    );
};

export default NewPizzaForm;
