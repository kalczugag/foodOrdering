import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUser } from "../hooks/use-user";
import { useThunk } from "../hooks/use-thunk";
import { fetchOrders, fetchProducts } from "../store";
import AdminOrders from "../components/AdminOrders";
import AdminProducts from "../components/AdminProducts";
import NewPizzaForm from "../components/NewPizzaForm";
import EditPizzaForm from "../components/EditPizzaForm";
import Skeleton from "react-loading-skeleton";

const AdminMain = () => {
    const [showNewPizzaModal, setShowNewPizzaModal] = useState(false);
    const [showEditPizzaModal, setShowEditPizzaModal] = useState(false);
    const [item, setItem] = useState(null);

    const [doFetchAdminOrders, isLoadingOrders] = useThunk(fetchOrders);
    const [doFetchProducts, isLoadingProducts] = useThunk(fetchProducts);

    const ordersData = useSelector((state) => state.orders.dataAdmin);
    const productsData = useSelector((state) => state.products.data);

    const { user } = useUser();
    const admin = user && user.admin;

    useEffect(() => {
        if (admin && ordersData.length <= 0 && !isLoadingOrders) {
            doFetchAdminOrders(true);
        } else if (admin && productsData.length <= 0 && !isLoadingProducts) {
            doFetchProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchAdminOrders, doFetchProducts, admin, ordersData, productsData]);

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
        <>
            {admin ? (
                <div className="flex flex-col p-10 justify-between space-y-12 xl:space-y-0 xl:flex-row">
                    <AdminProducts
                        onOpen={handleOpenModal}
                        onEdit={handleEditProduct}
                    />
                    <AdminOrders />
                </div>
            ) : (
                <div className="flex flex-col p-10 justify-between space-y-12 xl:space-y-0 xl:flex-row">
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
        </>
    );
};

export default AdminMain;
