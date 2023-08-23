import { useTitle } from "../hooks/use-title";
import { useUser } from "../hooks/use-user";

const ProfileDetails = () => {
    const { email, name } = useUser();
    useTitle("Details - Profile");

    const config = [
        { label: "First Name", value: name },
        { label: "Last Name" },
        { label: "Email", value: email },
        { label: "City" },
        { label: "Address" },
        { label: "Postal Code" },
        { label: "Phone Number" },
    ];

    const renderedInfo = config.map(({ label, value }, index) => {
        return (
            <div key={index} className="flex flex-row justify-between">
                <div className="font-bold">{label}:</div>
                <div>{value}</div>
            </div>
        );
    });

    return (
        <div>
            <div className="flex flex-row space-x-6 justify-between">
                <h1 className="text-3xl font-bold">Welcome, {name}</h1>
                <button>Edit</button>
            </div>
            <div className="flex flex-col space-y-2 mt-6">{renderedInfo}</div>
        </div>
    );
};

export default ProfileDetails;
