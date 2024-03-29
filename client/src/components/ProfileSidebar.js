import { useLocation, Link } from "react-router-dom";
import { MdPayment, MdAdminPanelSettings } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { useUser } from "../hooks/use-user";

const ProfileSidebar = () => {
    const location = useLocation();
    const { admin } = useUser();

    const links = [
        {
            label: "Personal Details",
            to: "/profile",
            icon: <ImProfile />,
        },
        {
            label: "Payment History",
            to: "/profile/history",
            icon: <MdPayment />,
        },
    ];

    const renderedLinks = links.map(({ label, to, icon }) => {
        const isActive = location.pathname === to;
        const activeClass = isActive ? "bg-gray-200" : "";

        return (
            <Link
                to={to}
                key={to}
                className={`flex flex-row items-center space-x-2 p-3 cursor-pointer hover:bg-gray-100 ${activeClass}`}
            >
                {icon}
                <div className="hidden md:block">{label}</div>
            </Link>
        );
    });

    return (
        <div className="flex flex-col border space-y-2">
            {renderedLinks}
            {admin && (
                <Link
                    to="/admin"
                    className="flex flex-row items-center space-x-2 p-3 cursor-pointer hover:bg-gray-100"
                >
                    <MdAdminPanelSettings />
                    <div className="hidden md:block">Admin</div>
                </Link>
            )}
            <a
                href="/api/logout"
                className="flex flex-row items-center space-x-2 p-3 cursor-pointer hover:bg-gray-100"
            >
                <FiLogOut />
                <div className="hidden md:block">Logout</div>
            </a>
        </div>
    );
};

export default ProfileSidebar;
