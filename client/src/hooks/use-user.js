import { useSelector } from "react-redux";

export const useUser = () => {
    const userData = useSelector((state) => state.auth.data);
    const isLoading = useSelector((state) => state.auth.isLoading);

    return { user: userData, isLoading };
};
