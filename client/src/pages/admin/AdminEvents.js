import { useEffect, useState } from "react";
import { useThunk } from "../../hooks/use-thunk";
import { usePaginate } from "../../hooks/use-paginate";
import { fetchEvents, removeEvent } from "../../store";
import NewEventForm from "../../components/NewEventForm";
import SortableTable from "../../components/SortableTable";
import PaginationContainer from "../../components/PaginationConatiner";

const AdminEvents = () => {
    const [doFetchEvents, isFetchingEvents] = useThunk(fetchEvents);
    const [doRemoveEvent, isRemovingEvent] = useThunk(removeEvent);

    const [showNewEventForm, setShowNewEventForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [paginatedData, totalPages] = usePaginate(
        "events.data",
        5,
        currentPage
    );

    useEffect(() => {
        if (paginatedData.length <= 0 && !isFetchingEvents) doFetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchEvents]);

    const config = [
        {
            label: "Image",
            render: (event) => (
                <img
                    className="h-20 object-contain md:object-cover"
                    src={event.img}
                    alt={event.title}
                />
            ),
        },
        { label: "Title", render: (event) => event.title },
        { label: "Description", render: (event) => event.desc },
        {
            label: "Date",
            render: ({ date: { day, month, year } }) => (
                <div>
                    {day} {month} {year}
                </div>
            ),
            sortValue: (event) => event.createdAt,
        },
        {
            label: "Time",
            render: ({ date: { time } }) => (
                <div>
                    {time.from} - {time.to}
                </div>
            ),
            sortValue: (event) => event.createdAt,
        },
        {
            label: "Action",
            render: (event) => (
                <div className="flex flex-col items-center text-white md:space-x-2 md:flex-row">
                    <button
                        onClick={() => console.log("edit")}
                        className="w-full color p-1 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleRemoveEvent(event)}
                        className="w-full bg-red-main p-1 rounded"
                        disabled={isRemovingEvent}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    //the two handlers are due to various unwanted cases
    const handleShowForm = () => {
        setShowNewEventForm(true);
    };

    const handleCloseForm = () => {
        setShowNewEventForm(false);
    };

    const handleRemoveEvent = (event) => {
        doRemoveEvent(event);
    };

    const keyFn = (data) => {
        return data.id;
    };

    return (
        <>
            <div className="flex flex-col p-10 space-y-4">
                <div className="flex flex-row items-end space-x-4">
                    <h1 className="text-3xl font-bold">Events</h1>
                    <button
                        className="text-red-main font-bold"
                        onClick={handleShowForm}
                    >
                        Add New
                    </button>
                </div>
                <SortableTable
                    config={config}
                    data={paginatedData}
                    keyFn={keyFn}
                />
                <PaginationContainer
                    setPage={setCurrentPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </div>
            {showNewEventForm && <NewEventForm onClose={handleCloseForm} />}
        </>
    );
};

export default AdminEvents;