import Skeleton from "react-loading-skeleton";

const PostsSkeleton = () => {
    return (
        <div className="flex flex-col space-y-12 col-span-3 xl:col-span-5">
            <div className="flex flex-row space-y-4 space-x-6">
                <Skeleton height="240px" width="23vw" />
                <div className="flex flex-col space-y-2 w-full xl:w-1/3">
                    <Skeleton height={20} />
                    <Skeleton height={65} />
                    <Skeleton height={65} />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 md:gap-8 xl:grid-cols-5">
                <div className="flex flex-col">
                    <Skeleton height="128px" width="100%" />
                    <div className="flex flex-col space-y-2 mt-2">
                        <Skeleton height={20} />
                        <div className="w-screen" />
                        <Skeleton height={50} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <Skeleton height="128px" width="100%" />
                    <div className="flex flex-col space-y-2 mt-2">
                        <Skeleton height={20} />
                        <div className="w-screen" />
                        <Skeleton height={50} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <Skeleton height="128px" width="100%" />
                    <div className="flex flex-col space-y-2 mt-2">
                        <Skeleton height={20} />
                        <div className="w-screen" />
                        <Skeleton height={50} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostsSkeleton;
