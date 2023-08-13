import "../../utils/styles/adminLogin.css";
import { Form, Field } from "react-final-form";
import { adminLogin } from "../../store";
import { useThunk } from "../../hooks/use-thunk";
import { useUser } from "../../hooks/use-user";
import { useTitle } from "../../hooks/use-title";

const AdminLogin = () => {
    useTitle("Admin login");
    const [doLoginAdmin] = useThunk(adminLogin);
    const user = useUser();
    console.log(user);

    const onSubmit = (e) => {
        if (user && user.admin) {
            window.location.href = "/admin";
        } else {
            doLoginAdmin(e);
        }
    };

    const required = (value) => (value ? undefined : "Required");

    return (
        <div className="flex justify-center">
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-4 items-center mt-28"
                    >
                        <h2 className="text-3xl">Admin Dashboard</h2>
                        <Field name="username" validate={required}>
                            {({ input, meta }) => (
                                <div>
                                    <input
                                        {...input}
                                        className="border"
                                        type="text"
                                        placeholder="username"
                                    />
                                    {meta.error && meta.touched && (
                                        <span>{meta.error}</span>
                                    )}
                                </div>
                            )}
                        </Field>
                        <Field name="password" validate={required}>
                            {({ input, meta }) => (
                                <div>
                                    <input
                                        {...input}
                                        type="password"
                                        placeholder="password"
                                    />
                                    {meta.error && meta.touched && (
                                        <span>{meta.error}</span>
                                    )}
                                </div>
                            )}
                        </Field>
                        <button
                            className="color p-2 text-white w-full rounded"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                )}
            />
        </div>
    );
};

export default AdminLogin;
