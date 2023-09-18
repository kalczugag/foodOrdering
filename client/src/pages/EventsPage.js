import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { useTitle } from "../hooks/use-title";
import { useUser } from "../hooks/use-user";
import { fetchEvents } from "../store";
import { AiOutlinePlus } from "react-icons/ai";
import NewEventForm from "../components/NewEventForm";
import EventItem from "../components/EventItem";

const Events = () => {
    const [showNewEventForm, setShowNewEventForm] = useState(false);

    useTitle("Events");

    const { user } = useUser();
    const events = useSelector((state) => state.events.data);

    const [doFetchEvents] = useThunk(fetchEvents);

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

    const admin = user && user.admin;
    return (
        <>
            <div className="grid grid-cols-4 p-10 gap-10">
                {events ? renderedEvents : <div>There are no events</div>}
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
