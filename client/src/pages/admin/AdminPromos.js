import { addDiscount } from "../../store";
import { useThunk } from "../../hooks/use-thunk";
import { Form, Field } from "react-final-form";
import DiscountsList from "../../components/DiscountsList";

const AdminPromos = () => {
    const [doAddDiscount, isAddingDiscount] = useThunk(addDiscount);

    const handleAddDiscount = (values) => {
        try {
            doAddDiscount(values);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Form
                onSubmit={handleAddDiscount}
                render={({ handleSubmit }) => (
                    <form
                        id="myForm"
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4 py-6 items-center"
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
                            className="color text-white rounded p-1 px-6 mt-4"
                        >
                            Submit
                        </button>
                    </form>
                )}
            />
            <DiscountsList />
        </div>
    );
};

export default AdminPromos;
