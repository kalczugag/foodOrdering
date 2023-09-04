import { useState } from "react";
import { useTitle } from "../hooks/use-title";
import { useThunk } from "../hooks/use-thunk";
import { useUser } from "../hooks/use-user";
import { editUser } from "../store";
import { formatPostal } from "../utils/functions/formatPostal";
import ProfileEditForm from "./ProfileEditForm";

const ProfileDetails = () => {
    const [doEditUser] = useThunk(editUser);

    const { user } = useUser();
    useTitle("Details - Profile");

    const [isEdit, setIsEdit] = useState(false);

    const config = [
        { label: "First Name", name: "username", initialValue: user.name },
        // { label: "Last Name", name: "lastName", initialValue: user. },
        { label: "Email", name: "email", initialValue: user.email },
        {
            label: "City*",
            name: "city",
            initialValue: user.address ? user.address.city : "",
        },
        {
            label: "Street*",
            name: "street",
            initialValue: user.address ? user.address.street : "",
        },
        {
            label: "Postal Code*",
            name: "postal",
            initialValue: user.address ? user.address.postal : "",
        },
        { label: "Phone Number", name: "phone", initialValue: user.phone },
    ];

    const handleEditToggle = () => {
        setIsEdit(!isEdit);
    };

    const onSubmit = (values) => {
        // Handle form submission here, e.g., update user's information
        doEditUser(values);
        // After submission, toggle back to view mode
        setIsEdit(false);
    };

    const renderedInfo = config.map(({ label, initialValue, name }, index) => (
        <div key={index} className="flex flex-row justify-between">
            <div className="font-bold">{label}:</div>
            <div>
                {name === "postal" ? formatPostal(initialValue) : initialValue}
            </div>
        </div>
    ));

    return (
        <div>
            <div className="flex flex-row space-x-6">
                <h1 className="text-3xl font-bold">
                    <span className="text-red-main">Welcome,</span> {user.name}
                </h1>
                {isEdit || <button onClick={handleEditToggle}>Edit</button>}
            </div>
            <div className="flex flex-col space-y-2 mt-6">
                {isEdit ? (
                    <ProfileEditForm
                        config={config}
                        onSubmit={onSubmit}
                        editFn={handleEditToggle}
                    />
                ) : (
                    // Render read-only information
                    renderedInfo
                )}
            </div>
            <div className="mt-10 text-xs font-semibold ">
                <>You have to set fields with * to place an order</>
            </div>
        </div>
    );
};

export default ProfileDetails;
