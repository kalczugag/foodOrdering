import { useTitle } from "../hooks/use-title";
import { useUser } from "../hooks/use-user";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";

const Events = () => {
    useTitle("Events");
    const { user } = useUser();

    const events = [
        {
            title: "The Office Trivia",
            date: {
                day: 1,
                month: "January",
                year: 2024,
                time: {
                    from: "17:30",
                    to: "20:30",
                },
            },
            img: "https://i.pinimg.com/750x/04/f6/63/04f66364609cf0c84261fae0aee5ac7a.jpg",
        },
    ];

    const renderedEvents = events.map(({ title, date, img }) => {
        return (
            <div className="flex flex-col">
                <div>
                    <img className="w-72 h-40" src={img} alt={title} />
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
    });

    const admin = user && user.admin;

    return (
        <div className="grid grid-cols-4 p-8">
            {renderedEvents}
            {admin && (
                <div className="fixed bottom-2 right-2 flex justify-center items-center w-16 h-16 bg-red-main rounded-full">
                    <AiOutlinePlus className="text-white text-4xl" />
                </div>
            )}
        </div>
    );
};

export default Events;
