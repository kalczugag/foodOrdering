import { useSelector } from "react-redux";

export const usePaginate = (option, itemsPerPage, currentPage) => {
    const stateSliceKeys = option.split(".");
    const data =
        useSelector((state) => {
            const nestedData = stateSliceKeys.reduce(
                (obj, key) => (obj && obj[key]) || {},
                state
            );

            return nestedData || [];
        }) || [];

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return [paginatedData, totalPages];
};

//how to use
//const [paginatedData, totalPages] = usePaginate("slice.state", 5, currentPage);
