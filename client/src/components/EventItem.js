import { FaRegTrashAlt } from "react-icons/fa";
import { useUser } from "../hooks/use-user";
import { useThunk } from "../hooks/use-thunk";
import { removeEvent } from "../store";

const EventItem = ({ data }) => {
    const [doRemoveEvent, isRemoveLoading] = useThunk(removeEvent);

    const { user } = useUser();
    const admin = user && user.admin;

    const handleRemoveEvent = () => {
        doRemoveEvent(data);
    };

    return (
        <div className="relative flex flex-row max-w-md md:flex-col">
            {admin && (
                <button
                    onClick={handleRemoveEvent}
                    className="relative -top-2 -right-2 z-10 text-2xl bg-white rounded p-1 opacity-80 md:absolute"
                    disabled={isRemoveLoading}
                >
                    <FaRegTrashAlt />
                </button>
            )}
            <div className="relative hidden h-40 bg-gray-200 md:block">
                <img
                    className="w-full h-full object-contain"
                    src={data.img}
                    alt={data.title}
                    loading="lazy"
                />
            </div>
            <div className="flex flex-row space-x-4 px-2 shadow-md md:shadow-none">
                <div className="flex flex-col">
                    <div className="text-red-main font-semibold">
                        {data.date.month.slice(0, 3).toUpperCase()}
                    </div>
                    <div className="flex justify-center text-xl font-bold">
                        {data.date.day}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div>
                        {data.date.time.from} - {data.date.time.to}
                    </div>
                    <div className="text-xl">{data.title}</div>
                </div>
            </div>
        </div>
    );
};

export default EventItem;
