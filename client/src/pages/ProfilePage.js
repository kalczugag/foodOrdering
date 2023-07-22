import { Outlet } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";

const ProfilePage = () => {
    return (
        <div className="flex flex-row p-2 space-x-10">
            <ProfileSidebar />
            <Outlet />
        </div>
    );
};

export default ProfilePage;
