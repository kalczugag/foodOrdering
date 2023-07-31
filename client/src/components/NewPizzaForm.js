import "../utils/styles/pizzaForm.css";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import { useThunk } from "../hooks/use-thunk";
import { addProduct } from "../store";
import Modal from "./Modal";
import NewPizzaReview from "./NewPizzaReview";

const NewPizzaForm = ({ action }) => {
    const [formValues, setFormValues] = useState({});
    const [showReview, setShowReview] = useState(false);

    const [doAddProduct] = useThunk(addProduct);

    const onSubmit = (values) => {
        setFormValues(values);
        setShowReview(true);
    };

    const handleFinalSubmit = () => {
        doAddProduct(formValues);
        action();
        setShowReview(false);
        setFormValues({});
    };

    // const required = (value) => (value ? undefined : "Required");

    const actionBar = (
        <div className="mt-6">
            <button type="submit" className="color text-white p-1 px-6 rounded">
                Create
            </button>
        </div>
    );

    return (
        <Modal onClose={action} actionBar={actionBar}>
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
                                    Choose an Image URI
                                </label>
                                <Field
                                    className="input-initial"
                                    type="text"
                                    component="input"
                                    name="imageURI"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="field-label">Title</label>
                                <Field
                                    className="input-initial"
                                    type="text"
                                    component="input"
                                    name="title"
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
                                    />
                                    <Field
                                        className="input-initial"
                                        type="number"
                                        component="input"
                                        placeholder="Medium"
                                        name="mediumPrice"
                                    />
                                    <Field
                                        className="input-initial"
                                        type="number"
                                        component="input"
                                        placeholder="Large"
                                        name="largePrice"
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
                            <div className="grid grid-cols-3 gap-4">
                                <div></div>
                                <div></div>
                                <button
                                    onClick={() => onSubmit(getState().values)}
                                    type="button"
                                    className="color text-white rounded p-1 mt-4"
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
