import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { useTitle } from "../hooks/use-title";
import { fetchEvents } from "../store";
import EventItem from "../components/EventItem";
import EventsSkeleton from "../components/EventsSkeleton";

const Events = () => {
    const events = useSelector((state) => state.events.data);

    useTitle("Events");

    const [doFetchEvents, isLoadingEvents] = useThunk(fetchEvents);

    useEffect(() => {
        if (events.length <= 0 && !isLoadingEvents) doFetchEvents();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchEvents, events]);

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
            </div>
        </>
    );
};

export default Events;
