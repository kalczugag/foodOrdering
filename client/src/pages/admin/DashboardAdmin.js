import { useEffect, useState } from "react";
import { fetchProducts, fetchOrders } from "../../store";
import { useThunk } from "../../hooks/use-thunk";
import { useUser } from "../../hooks/use-user";
import AdminOrders from "../../components/AdminOrders";
import AdminProducts from "../../components/AdminProducts";
import NewPizzaForm from "../../components/NewPizzaForm";

const DashboardAdmin = () => {
    const [showModal, setShowModal] = useState(true);

    const user = useUser();

    const [doFetchProducts] = useThunk(fetchProducts);
    const [doFetchOrders] = useThunk(fetchOrders);

    useEffect(() => {
        if (user && user.admin) {
            doFetchProducts();
            doFetchOrders();
        }
    }, [doFetchProducts, doFetchOrders, user]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {user && user.admin ? (
                <div className="flex flex-col p-10 justify-between space-y-12 md:space-y-0 md:flex-row md:p-14">
                    <AdminProducts action={handleOpenModal} />
                    <AdminOrders />
                </div>
            ) : (
                <div className="text-xl text-center">You are not an admin!</div>
            )}
            {showModal && <NewPizzaForm action={handleCloseModal} />}
        </div>
    );
};

export default DashboardAdmin;
