const NewPizzaReview = ({ setReview }) => {
    return (
        <div className="flex justify-between">
            <button
                onClick={() => setReview(false)}
                className="bg-red-main text-white p-1 px-6 rounded"
            >
                Back
            </button>
            <button className="color text-white p-1 px-5 rounded">
                Create
            </button>
        </div>
    );
};

export default NewPizzaReview;
