import { FaRegTrashAlt } from "react-icons/fa";

const EventItem = ({ data: { title, date, img } }) => {
    return (
        <div className="relative flex flex-col max-w-md">
            <button className="absolute -top-2 -right-2 z-10 text-2xl bg-white rounded p-1 opacity-80">
                <FaRegTrashAlt />
            </button>
            <div className="relative h-40 bg-gray-200">
                <img
                    className="w-full h-full object-contain"
                    src={img}
                    alt={title}
                    loading="lazy"
                />
            </div>
            <div className="flex flex-row space-x-4 px-2">
                <div className="flex flex-col">
                    <div className="text-red-main font-semibold">
                        {date.month.slice(0, 3).toUpperCase()}
                    </div>
                    <div className="flex justify-center text-xl font-bold">
                        {date.day}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div>
                        {date.time.from} - {date.time.to}
                    </div>
                    <div className="text-xl">{title}</div>
                </div>
            </div>
        </div>
    );
};

export default EventItem;
