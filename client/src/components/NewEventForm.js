import "../utils/styles/pizzaForm.css";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import { useThunk } from "../hooks/use-thunk";
import { addEvent } from "../store";
import DateValidator from "../utils/functions/validateDate";
import DateUtils from "../utils/functions/formatDate";
import Modal from "./Modal";

const NewPizzaForm = ({ onClose }) => {
    const [imageFile, setImageFile] = useState(null);
    const [doAddEvent] = useThunk(addEvent);

    const onSubmit = (values) => {
        try {
            const { day, month, year, time } = values.date;

            const formattedDate = {
                ...DateUtils.formatDate(day, month, year),
                time,
            };

            const modifiedValues = {
                ...values,
                date: formattedDate,
            };

            doAddEvent([modifiedValues, imageFile]);
            onClose();
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const required = (value) => (value ? undefined : "Required");
    const dayError = (value) => DateValidator.validateDay(value);
    const monthError = (value) => DateValidator.validateMonth(value);
    const yearError = (value) => DateValidator.validateYear(value);
    const timeError = (value) => DateValidator.validateTime(value);

    return (
        <Modal onClose={onClose}>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form: { getState } }) => (
                    <form
                        id="myForm"
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-8"
                    >
                        <h1 className="font-bold text-3xl">Add a new Event</h1>
                        <div className="space-y-2">
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
                                accept="image/*"
                                required
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
                        <div className="flex flex-row space-x-6">
                            <div className="flex flex-col">
                                <label className="field-label">Day</label>
                                <Field
                                    className="input-initial"
                                    placeholder="dd"
                                    type="text"
                                    component="input"
                                    name="date.day"
                                    validate={dayError}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="field-label">Month</label>
                                <Field
                                    className="input-initial"
                                    placeholder="mm"
                                    type="text"
                                    component="input"
                                    name="date.month"
                                    validate={monthError}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="field-label">Year</label>
                                <Field
                                    className="input-initial"
                                    placeholder="yyyy"
                                    type="text"
                                    component="input"
                                    name="date.year"
                                    validate={yearError}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row space-x-12">
                            <div className="flex flex-col">
                                <label className="field-label">Starts</label>
                                <Field
                                    className="input-initial"
                                    placeholder="00:00"
                                    type="text"
                                    component="input"
                                    name="date.time.from"
                                    validate={timeError}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="field-label">Ends</label>
                                <Field
                                    className="input-initial"
                                    placeholder="00:00"
                                    type="text"
                                    component="input"
                                    name="date.time.to"
                                    validate={timeError}
                                />
                            </div>
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
                                Add
                            </button>
                        </div>
                    </form>
                )}
            />
        </Modal>
    );
};

export default NewPizzaForm;
