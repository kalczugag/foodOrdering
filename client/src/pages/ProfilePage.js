import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useUser } from "../hooks/use-user";
import { useThunk } from "../hooks/use-thunk";
import { fetchOrders } from "../store";
import ProfileSidebar from "../components/ProfileSidebar";

const ProfilePage = () => {
    const { user } = useUser();

    const [doFetchOrders] = useThunk(fetchOrders);

    useEffect(() => {
        doFetchOrders();
    }, [doFetchOrders]);

    if (user === false) {
        return <div>You are not logged in!</div>;
    }

    return (
        <div>
            {user ? (
                <div className="flex flex-row p-2 space-x-4 md:space-x-10">
                    <ProfileSidebar />
                    <Outlet />
                </div>
            ) : (
                <div className="flex flex-row space-x-6 mx-4 mt-24">
                    <Skeleton height="40vh" width="10vw" />
                    <Skeleton width="35vw" height={25} count={8} />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
