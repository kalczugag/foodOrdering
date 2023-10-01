import { Form, Field } from "react-final-form";

const renderInputField = ({ input, meta, label }) => (
    <div className="flex flex-row justify-between items-center space-x-4">
        <div className="font-bold">{label}:</div>
        <input
            {...input}
            type="text"
            className="rounded-none border-b-2 border-0 outline-none focus:border-b-gray-main"
        />
    </div>
);

const ProfileEditForm = ({ config, onSubmit, editFn }) => {
    const initialValues = config.reduce((values, field) => {
        values[field.name] = field.initialValue;
        return values;
    }, {});

    const renderedInfoToChange = config.map(({ label, name }) => (
        <Field
            key={name}
            name={name}
            component={renderInputField}
            label={label}
        />
    ));

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    {renderedInfoToChange}
                    <div className="flex flex-row justify-end space-x-2 text-white mt-6">
                        <button
                            type="button"
                            onClick={editFn}
                            className="bg-red-main px-3 p-1 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-main px-3 p-1 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            )}
        />
    );
};

export default ProfileEditForm;
