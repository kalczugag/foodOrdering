const NewPizzaReview = ({
    formValues: { title, desc, smallPrice, mediumPrice, largePrice, extras },
    onEdit,
    finalSubmit,
}) => {
    return (
        <div className="flex flex-col justify-between space-y-4">
            <div>
                <label>Title</label>
                <p>{title}</p>
            </div>
            <div>
                <label>Description</label>
                <p>{desc}</p>
            </div>
            <div>
                <label>Prices</label>
                <div className="flex flex-row justify-between">
                    <p>Small: {smallPrice}</p>
                    <p>Medium: {mediumPrice}</p>
                    <p>Large: {largePrice}</p>
                </div>
                <div>
                    <label>extras</label>
                    <p>{extras}</p>
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    onClick={onEdit}
                    className="bg-red-main text-white p-1 px-6 rounded"
                >
                    Back
                </button>
                <button
                    form="myForm"
                    onClick={finalSubmit}
                    className="color text-white p-1 px-5 rounded"
                >
                    Create
                </button>
            </div>
        </div>
    );
};

export default NewPizzaReview;
