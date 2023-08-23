import { Outlet } from "react-router-dom";
import { useUser } from "../hooks/use-user";
import { useThunk } from "../hooks/use-thunk";
import { fetchOrders } from "../store";
import ProfileSidebar from "../components/ProfileSidebar";
import { useEffect } from "react";

const ProfilePage = () => {
    const user = useUser();

    const [doFetchOrders] = useThunk(fetchOrders);

    useEffect(() => {
        doFetchOrders();
    }, [doFetchOrders]);

    return (
        <div>
            {user ? (
                <div className="flex flex-row p-2 space-x-10">
                    <ProfileSidebar />
                    <Outlet />
                </div>
            ) : (
                <div className="mx-auto mt-14 text-xl">
                    You are not logged in!
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
