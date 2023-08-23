import { useSelector } from "react-redux";
import { useTitle } from "../hooks/use-title";
import PaymentsList from "./PaymentsList";

const ProfilePayments = () => {
    useTitle("Payments - Profile");

    const data = useSelector((state) => state.orders.data);

    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">Payments</h1>
            {Array.isArray(data) && data.length > 0 ? (
                <PaymentsList data={data} />
            ) : (
                "You don't have any orders"
            )}
        </div>
    );
};

export default ProfilePayments;
