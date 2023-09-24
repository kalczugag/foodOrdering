import { useState, useEffect } from "react";
import { useUser } from "../../hooks/use-user";
import { useTitle } from "../../hooks/use-title";
import { useThunk } from "../../hooks/use-thunk";
import { fetchOrders } from "../../store";
import AdminOrders from "../../components/AdminOrders";
import AdminProducts from "../../components/AdminProducts";
import NewPizzaForm from "../../components/NewPizzaForm";
import EditPizzaForm from "../../components/EditPizzaForm";
import Skeleton from "react-loading-skeleton";

const DashboardAdmin = () => {
    const [showNewPizzaModal, setShowNewPizzaModal] = useState(false);
    const [showEditPizzaModal, setShowEditPizzaModal] = useState(false);
    const [item, setItem] = useState(null);

    const [doFetchAdminOrders] = useThunk(fetchOrders);

    useTitle("Admin dashboard");

    const { user } = useUser();
    const admin = user && user.admin;

    useEffect(() => {
        doFetchAdminOrders(true);
    }, [doFetchAdminOrders]);

    if (user === false) {
        return <div>You are not an admin!</div>;
    }

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
            {admin ? (
                <div className="flex flex-col p-10 justify-between space-y-12 xl:space-y-0 xl:flex-row xl:p-14">
                    <AdminProducts
                        onOpen={handleOpenModal}
                        onEdit={handleEditProduct}
                    />
                    <AdminOrders />
                </div>
            ) : (
                <div className="flex flex-col p-10 justify-between space-y-12 xl:space-y-0 xl:flex-row xl:p-14">
                    <div className="flex flex-col">
                        <div className="flex flex-row space-x-2 items-end">
                            <Skeleton
                                height={40}
                                width={200}
                                className="mb-6"
                            />
                            <Skeleton
                                height={20}
                                width={100}
                                className="mb-6"
                            />
                        </div>
                        <Skeleton height={50} width="30vw" count={5} />
                    </div>
                    <div>
                        <Skeleton height={40} width={200} className="mb-6" />
                        <Skeleton height={50} width="30vw" count={5} />
                    </div>
                </div>
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
