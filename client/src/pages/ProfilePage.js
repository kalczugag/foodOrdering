import { Outlet } from "react-router-dom";
import { useUser } from "../hooks/use-user";
import ProfileSidebar from "../components/ProfileSidebar";

const ProfilePage = () => {
    const user = useUser();

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
