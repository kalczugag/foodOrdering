import Skeleton from "react-loading-skeleton";

const EventSkeletonItem = (
    <>
        <div className="hidden md:block">
            <div className="hidden h-40 mb-1 bg-gray-200 md:block">
                <Skeleton width="100%" height="100%" />
            </div>
            <div className="flex flex-row space-x-4 px-2">
                <div className="flex flex-col">
                    <div className="text-red-main font-semibold">
                        <Skeleton height={20} width={60} />
                    </div>
                    <div className="flex justify-center text-xl font-bold">
                        <Skeleton height={25} width={60} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row space-x-4">
                        <Skeleton height={20} width={80} />
                        <Skeleton height={20} width={80} />
                    </div>
                    <div className="text-xl">
                        <Skeleton height={25} width="100%" />
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-row space-x-2 md:hidden">
            <div className="flex flex-col">
                <div className="text-red-main font-semibold">
                    <Skeleton height={25} width={60} />
                </div>
                <div className="flex justify-center text-xl font-bold">
                    <Skeleton height={45} width={60} />
                </div>
            </div>
            <div className="flex flex-col">
                <Skeleton count={2} height={20} width={85} />
                <Skeleton height={25} width="100%" />
            </div>
        </div>
    </>
);

const EventsSkeleton = () => {
    return (
        <div>
            {/* Render 2 times for small screens */}
            <div className="flex flex-row space-x-6 md:hidden">
                {[...Array(2)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-row max-w-md md:flex-col"
                    >
                        {EventSkeletonItem}
                    </div>
                ))}
            </div>

            {/* Render 3 times for medium screens */}
            <div className="hidden flex-row space-x-6 md:flex xl:hidden">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-row max-w-md md:flex-col"
                    >
                        {EventSkeletonItem}
                    </div>
                ))}
            </div>

            {/* Render 5 times for xl screens */}
            <div className="hidden flex-row space-x-6 xl:flex">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-row max-w-md md:flex-col"
                    >
                        {EventSkeletonItem}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsSkeleton;
