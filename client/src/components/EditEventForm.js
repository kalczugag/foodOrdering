import "../utils/styles/pizzaForm.css";
import { useState, useEffect } from "react";
import { isEqual } from "lodash";
import { Form, Field } from "react-final-form";
import { useThunk } from "../hooks/use-thunk";
import { editEvent } from "../store";
import { convertToBase64 } from "../utils/functions/convertToBase64";
import DateValidator from "../utils/functions/validateDate";
import DateUtils from "../utils/functions/formatDate";
import Modal from "./Modal";

const EditEventForm = ({ onClose, event: { _id, date, img, title } }) => {
    const [imageFile, setImageFile] = useState(null);
    const [initialValues, setInitialValues] = useState(null);

    const [doEditEvent] = useThunk(editEvent);

    useEffect(() => {
        setInitialValues({
            title,
            date: {
                day: DateUtils.formatDateString(date),
                time: {
                    from: date.time.from,
                    to: date.time.to,
                },
            },
        });
    }, [title, date]);

    const onSubmit = (values) => {
        const isFormChanged = !isEqual(initialValues, values);
        if (isFormChanged || imageFile !== null) {
            try {
                const { day, time } = values.date;

                const formattedDate = {
                    ...DateUtils.formatDate(day),
                    time,
                };

                const modifiedValues = {
                    ...values,
                    _id,
                    date: formattedDate,
                };

                doEditEvent([modifiedValues, imageFile]);
                onClose();
            } catch (error) {
                console.error("Error adding event:", error);
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
    const timeError = (value) => DateValidator.validateTime(value);

    return (
        <Modal onClose={onClose}>
            <Form
                onSubmit={onSubmit}
                initialValues={{
                    title,
                    date: {
                        day: DateUtils.formatDateString(date),
                        time: {
                            from: date.time.from,
                            to: date.time.to,
                        },
                    },
                }}
                render={({ handleSubmit, form: { getState } }) => (
                    <form
                        id="myForm"
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-8"
                    >
                        <h1 className="font-bold text-3xl">Edit Event</h1>
                        <div className="space-y-2">
                            <img
                                className="h-20 border-2"
                                src={imageFile ? imageFile : img}
                                alt={title}
                            />
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
                                accept="image/*"
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
                            <label className="field-label">Day</label>
                            <Field
                                className="input-initial"
                                type="date"
                                component="input"
                                name="date.day"
                                validate={required}
                            />
                        </div>
                        <div className="flex flex-row space-x-12">
                            <div className="flex flex-col">
                                <label className="field-label">Starts</label>
                                <Field
                                    className="input-initial"
                                    type="time"
                                    component="input"
                                    name="date.time.from"
                                    validate={timeError}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="field-label">Ends</label>
                                <Field
                                    className="input-initial"
                                    type="time"
                                    component="input"
                                    name="date.time.to"
                                    validate={timeError}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="color text-white rounded p-1 px-6 mt-4"
                                disabled={getState().invalid}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            />
        </Modal>
    );
};

export default EditEventForm;
