import "../utils/styles/pizzaForm.css";
import { Form, Field } from "react-final-form";
import { useThunk } from "../hooks/use-thunk";
import { editProduct } from "../store";
import Modal from "./Modal";

const EditPizzaForm = ({
    onClose,
    item: { _id, img, blurhash, title, desc, price, extraOptions },
}) => {
    const [doEditProduct] = useThunk(editProduct);

    const onSubmit = (values) => {
        const updatedProduct = { _id, ...values };

        onClose();
        doEditProduct(updatedProduct);
    };

    const required = (value) => (value ? undefined : "Required");

    return (
        <Modal onClose={onClose}>
            <Form
                onSubmit={onSubmit}
                initialValues={{
                    imageURI: img,
                    blurhash: blurhash,
                    title: title,
                    desc: desc,
                    smallPrice: price[0],
                    mediumPrice: price[1],
                    largePrice: price[2],
                    extras: extraOptions || "",
                }}
                render={({ handleSubmit }) => (
                    <form
                        id="myForm"
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4"
                    >
                        <h1 className="font-bold text-3xl">
                            <span className="text-green-main">Edit</span>{" "}
                            {title} Pizza
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
                                validate={required}
                            />
                        </div>
                        <div>
                            <label className="field-label">
                                Choose a Blurhash
                            </label>
                            <Field
                                className="input-initial"
                                type="text"
                                component="input"
                                name="blurhash"
                                validate={required}
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
                            <label className="field-label">Description</label>
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
                            <button className="color text-white rounded p-1 px-6 mt-4">
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            />
        </Modal>
    );
};

export default EditPizzaForm;
