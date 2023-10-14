import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTitle } from "../hooks/use-title";
import { useThunk } from "../hooks/use-thunk";
import { fetchOrders } from "../store";
import PaymentsList from "./PaymentsList";

const ProfilePayments = () => {
    useTitle("Payments - Profile");

    const [doFetchOrders, isLoadingOrders] = useThunk(fetchOrders);

    const data = useSelector((state) => state.orders.data);

    useEffect(() => {
        if ((data.length <= 0 && !isLoadingOrders) || !Array.isArray(data))
            doFetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchOrders, data]);

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
