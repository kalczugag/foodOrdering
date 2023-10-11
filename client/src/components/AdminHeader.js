import { Link, useLocation } from "react-router-dom";
import { useUser } from "../hooks/use-user";

const AdminHeader = () => {
    const location = useLocation();

    const { user } = useUser();
    const admin = user && user.admin;

    const config = [
        { label: "Dashboard", to: "/admin" },
        { label: "Blog", to: "/admin/blog" },
        { label: "Events", to: "/admin/events" },
    ];

    const renderedLinks = config.map(({ label, to }) => {
        const isActive = location.pathname === to;
        const activeClass = isActive ? "border-b border-white" : "";

        return (
            <Link
                className={`transition-all hover:text-gray-100 ${activeClass}`}
                to={to}
                key={label.toLowerCase()}
            >
                {label}
            </Link>
        );
    });

    return (
        <>
            {admin && (
                <div className="fixed flex flex-row justify-center items-center top-20 left-0 right-0 h-7 space-x-6 bg-red-sub text-white text-sm">
                    {renderedLinks}
                </div>
            )}
        </>
    );
};

export default AdminHeader;
