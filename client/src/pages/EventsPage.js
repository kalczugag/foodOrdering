import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { useTitle } from "../hooks/use-title";
import { useUser } from "../hooks/use-user";
import { fetchEvents } from "../store";
import { AiOutlinePlus } from "react-icons/ai";
import NewEventForm from "../components/NewEventForm";
import EventItem from "../components/EventItem";
import EventsSkeleton from "../components/EventsSkeleton";

const Events = () => {
    const [showNewEventForm, setShowNewEventForm] = useState(false);

    const events = useSelector((state) => state.events.data);

    useTitle("Events");

    const { user } = useUser();
    const admin = user && user.admin;

    const [doFetchEvents, isLoadingEvents] = useThunk(fetchEvents);

    useEffect(() => {
        doFetchEvents();
    }, [doFetchEvents]);

    //the two handlers are due to various unwanted cases
    const handleShowForm = () => {
        setShowNewEventForm(true);
    };

    const handleCloseForm = () => {
        setShowNewEventForm(false);
    };

    const renderedEvents = events.map((event) => {
        return <EventItem key={event.title} data={event} />;
    });

    return (
        <>
            <div className="grid grid-cols-2 p-10 gap-10 md:grid-cols-4">
                {isLoadingEvents ? (
                    <EventsSkeleton />
                ) : events && events.length > 0 ? (
                    renderedEvents
                ) : (
                    <div className="text-xl font-bold w-48">
                        There are no events
                    </div>
                )}
                {admin && (
                    <button
                        onClick={handleShowForm}
                        className="fixed bottom-2 right-2 flex justify-center items-center w-16 h-16 bg-red-main rounded-full"
                    >
                        <AiOutlinePlus className="text-white text-4xl" />
                    </button>
                )}
            </div>
            {showNewEventForm && <NewEventForm onClose={handleCloseForm} />}
        </>
    );
};

export default Events;
