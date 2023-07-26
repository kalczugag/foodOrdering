import "../utils/styles/pizzaForm.css";
import { useState, Fragment } from "react";
import { Form, Field } from "react-final-form";
import NewPizzaReview from "./NewPizzaReview";
import Modal from "./Modal";

const InitialFields = ({ identifier }) => (
    <>
        <Field
            type="text"
            component="input"
            placeholder="Item"
            name={`exItem_${identifier}`}
        />
        <Field
            type="number"
            component="input"
            placeholder="Price"
            name={`exPrice_${identifier}`}
        />
    </>
);

const NewPizzaForm = ({ action }) => {
    const [showReview, setShowReview] = useState(false);
    const [extras, setExtras] = useState([
        [<InitialFields key={0} identifier={0} />],
    ]);

    const addNewExtra = () => {
        setExtras((prevExtras) => [
            ...prevExtras,
            <div></div>,
            <InitialFields
                key={prevExtras.length}
                identifier={prevExtras.length}
            />,
        ]);
    };

    const onSubmit = (e) => {
        console.log(e);
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
                    render={({ handleSubmit }) => (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4"
                        >
                            <h1 className="font-bold text-3xl">
                                Add a new Pizza
                            </h1>
                            <div>
                                <label>Choose an Image URI</label>
                                <Field
                                    type="text"
                                    component="input"
                                    name="imageURI"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>Title</label>
                                <Field
                                    type="text"
                                    component="input"
                                    name="title"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>Description</label>
                                <Field
                                    component="textarea"
                                    name="desc"
                                    className="border"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label>Prices</label>
                                <div className="flex flex-row justify-between space-x-8">
                                    <Field
                                        type="number"
                                        component="input"
                                        placeholder="Small"
                                        name="smallPrice"
                                    />
                                    <Field
                                        type="number"
                                        component="input"
                                        placeholder="Medium"
                                        name="mediumPrice"
                                    />
                                    <Field
                                        type="number"
                                        component="input"
                                        placeholder="Large"
                                        name="LargePrice"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label>Extras</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {extras.map((extra, index) => (
                                        <Fragment key={index}>{extra}</Fragment>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addNewExtra}
                                        className="button-colors w-full rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div></div>
                                <div></div>
                                <button
                                    type="button"
                                    onClick={() => setShowReview(true)}
                                    className="color text-white rounded p-1 mt-4"
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    )}
                />
            ) : (
                <NewPizzaReview setReview={setShowReview} />
            )}
        </Modal>
    );
};

export default NewPizzaForm;
