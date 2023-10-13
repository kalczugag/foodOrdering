import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addDiscount, fetchDiscounts } from "../../store";
import { useThunk } from "../../hooks/use-thunk";
import { useUser } from "../../hooks/use-user";
import { Form, Field } from "react-final-form";

const AdminPromos = () => {
    const [doFetchDiscounts, isFetchingDiscounts] = useThunk(fetchDiscounts);
    const [doAddDiscount, isAddingDiscount] = useThunk(addDiscount);

    const data = useSelector((state) => state.discount.data);

    const { user } = useUser();
    const admin = user && user.admin;

    useEffect(() => {
        if (admin && data.length <= 0 && !isFetchingDiscounts)
            doFetchDiscounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchDiscounts, data]);

    const handleAddDiscount = (values) => {
        try {
            doAddDiscount(values);
        } catch (err) {
            console.error(err);
        }
    };

    const renderedDiscounts = data.map(({ code, amount, expiresAt }) => {
        return (
            <div className="flex flex-col border border-black w-32">
                <p>{code}</p>
                <p>{amount}</p>
                <p>{expiresAt}</p>
            </div>
        );
    });

    return (
        <div>
            <Form
                onSubmit={handleAddDiscount}
                render={({ handleSubmit, form: { getState } }) => (
                    <form
                        id="myForm"
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4 items-center"
                    >
                        <Field
                            type="text"
                            component="input"
                            name="code"
                            placeholder="Code"
                        />
                        <Field
                            type="number"
                            component="input"
                            name="amount"
                            placeholder="Amount"
                        />
                        <Field type="date" component="input" name="expiresAt" />
                        <button
                            type="submit"
                            disabled={isAddingDiscount}
                            className="border border-black rounded p-1 px-2"
                        >
                            Submit
                        </button>
                    </form>
                )}
            />
            {renderedDiscounts || <div>Loading...</div>}
        </div>
    );
};

export default AdminPromos;
