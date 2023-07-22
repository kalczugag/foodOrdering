import { useLocation, Link } from "react-router-dom";
import { MdPayment } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";

const ProfileSidebar = () => {
    const location = useLocation();

    const links = [
        {
            label: "Personal Details",
            path: "/profile/details",
            icon: <ImProfile />,
        },
        {
            label: "Payment History",
            path: "/profile/history",
            icon: <MdPayment />,
        },
    ];

    const renderedLinks = links.map(({ label, path, icon }) => {
        const isActive = location.pathname === path;
        const activeClass = isActive ? "bg-gray-200" : "";

        return (
            <Link
                to={path}
                key={path}
                className={`flex flex-row items-center text-xl space-x-2 p-3 cursor-pointer hover:bg-gray-100 ${activeClass}`}
            >
                {icon}
                <div>{label}</div>
            </Link>
        );
    });

    console.log(location.pathname);

    return (
        <div className="flex flex-col border space-y-2">
            {renderedLinks}
            <a
                href="/api/logout"
                className="flex flex-row items-center text-xl space-x-2 p-3 cursor-pointer hover:bg-gray-100"
            >
                <FiLogOut />
                <div>Logout</div>
            </a>
        </div>
    );
};

export default ProfileSidebar;
