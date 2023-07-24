import { useEffect } from "react";
import { fetchProducts, fetchOrders } from "../../store";
import { useThunk } from "../../hooks/use-thunk";
import { useUser } from "../../hooks/use-user";
import AdminOrders from "../../components/AdminOrders";
import AdminProducts from "../../components/AdminProducts";

const DashboardAdmin = () => {
    const user = useUser();
    const [doFetchProducts, productsLoading, productsError] =
        useThunk(fetchProducts);
    const [doFetchOrders, ordersLoading, ordersError] = useThunk(fetchOrders);

    useEffect(() => {
        if (user && user.admin) {
            doFetchProducts();
            doFetchOrders();
        }
    }, [doFetchProducts, doFetchOrders, user]);

    return (
        <div>
            {user && user.admin ? (
                <div className="flex flex-col p-10 justify-between space-y-12 md:space-y-0 md:flex-row md:p-14">
                    <AdminProducts />
                    <AdminOrders />
                </div>
            ) : (
                <div className="text-xl text-center">You are not an admin!</div>
            )}
        </div>
    );
};

export default DashboardAdmin;
