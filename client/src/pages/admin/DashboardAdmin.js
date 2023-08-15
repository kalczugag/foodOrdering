import { useState } from "react";
import { useUser } from "../../hooks/use-user";
import { useTitle } from "../../hooks/use-title";
import AdminOrders from "../../components/AdminOrders";
import AdminProducts from "../../components/AdminProducts";
import NewPizzaForm from "../../components/NewPizzaForm";
import EditPizzaForm from "../../components/EditPizzaForm";

const DashboardAdmin = () => {
    const [showNewPizzaModal, setShowNewPizzaModal] = useState(false);
    const [showEditPizzaModal, setShowEditPizzaModal] = useState(false);
    const [item, setItem] = useState(null);
    const user = useUser();
    useTitle("Admin dashboard");

    const handleOpenModal = () => {
        setShowNewPizzaModal(true);
    };

    const handleCloseNewPizzaModal = () => {
        setShowNewPizzaModal(false);
    };

    const handleCloseEditPizzaModal = () => {
        setShowEditPizzaModal(false);
    };

    const handleEditProduct = (item) => {
        setItem(item);
        setShowEditPizzaModal(true);
    };

    return (
        <div>
            {user && user.admin ? (
                <div className="flex flex-col p-10 justify-between space-y-12 xl:space-y-0 xl:flex-row xl:p-14">
                    <AdminProducts
                        onOpen={handleOpenModal}
                        onEdit={handleEditProduct}
                    />
                    <AdminOrders />
                </div>
            ) : (
                <div className="text-xl text-center">You are not an admin!</div>
            )}
            {showNewPizzaModal && (
                <NewPizzaForm onClose={handleCloseNewPizzaModal} />
            )}
            {showEditPizzaModal && (
                <EditPizzaForm
                    onClose={handleCloseEditPizzaModal}
                    item={item}
                />
            )}
        </div>
    );
};

export default DashboardAdmin;
