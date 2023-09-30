import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const PaginationContainer = ({ setPage, totalPages, currentPage }) => {
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setPage(pageNumber);
        }
    };

    const activeClassName = "text-white bg-red-main";
    console.log(totalPages, " = ", currentPage);

    return (
        <div className="flex flex-row items-center text-lg mt-2">
            <button onClick={() => handlePageChange(currentPage - 1)}>
                <MdOutlineNavigateBefore />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`h-10 w-10 ${
                        currentPage === index + 1 ? activeClassName : ""
                    }`}
                >
                    {index + 1}
                </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)}>
                <MdOutlineNavigateNext />
            </button>
        </div>
    );
};

export default PaginationContainer;
