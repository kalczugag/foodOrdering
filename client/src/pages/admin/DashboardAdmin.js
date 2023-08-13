import { useState } from "react";
import { useUser } from "../../hooks/use-user";
import AdminOrders from "../../components/AdminOrders";
import AdminProducts from "../../components/AdminProducts";
import NewPizzaForm from "../../components/NewPizzaForm";
import { useTitle } from "../../hooks/use-title";

const DashboardAdmin = () => {
    const [showModal, setShowModal] = useState(false);
    const user = useUser();
    useTitle("Admin dashboard");

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {user && user.admin ? (
                <div className="flex flex-col p-10 justify-between space-y-12 xl:space-y-0 xl:flex-row xl:p-14">
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
