import { useUser } from "../../hooks/use-user";
import { useTitle } from "../../hooks/use-title";
import AdminHeader from "../../components/AdminHeader";
import { Outlet } from "react-router-dom";

const DashboardAdmin = () => {
    useTitle("Admin Dashboard");

    const { admin } = useUser();

    if (admin === false) {
        return <div>You are not an admin!</div>;
    }

    return (
        <div className="mt-28">
            <AdminHeader />
            <Outlet />
        </div>
    );
};

export default DashboardAdmin;
