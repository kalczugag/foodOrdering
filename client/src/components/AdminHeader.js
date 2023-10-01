import { Link } from "react-router-dom";
import { useUser } from "../hooks/use-user";

const AdminHeader = () => {
    const { user } = useUser();
    const admin = user && user.admin;

    const config = [
        { label: "Dashboard", name: "" },
        { label: "Blog", name: "blog" },
        { label: "Events", name: "events" },
    ];

    const renderedLinks = config.map(({ label, name }) => {
        return (
            <Link to={name} key={name}>
                {label}
            </Link>
        );
    });

    return (
        <>
            {admin && (
                <div className="fixed flex flex-row justify-center items-center top-20 left-0 right-0 h-7 space-x-6 bg-red-sub text-white text-sm hover:text-gray-100">
                    {renderedLinks}
                </div>
            )}
        </>
    );
};

export default AdminHeader;
