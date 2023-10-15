import { useEffect } from "react";
import { useThunk } from "../hooks/use-thunk";
import { useUser } from "../hooks/use-user";
import { fetchDiscounts } from "../store";
import DiscountsListItem from "./DiscountsListItem";
import { useSelector } from "react-redux";

const DiscountsList = () => {
    const [doFetchDiscounts, isFetchingDiscounts] = useThunk(fetchDiscounts);

    const { user } = useUser();
    const admin = user && user.admin;

    const data = useSelector((state) => state.discount.data);

    useEffect(() => {
        if (admin && data.length <= 0 && !isFetchingDiscounts)
            doFetchDiscounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [admin, doFetchDiscounts, data]);

    const renderedDiscountItems = data.map((discount) => {
        return <DiscountsListItem data={discount} />;
    });

    return (
        <div className="p-4 grid gap-2 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
            {renderedDiscountItems}
        </div>
    );
};

export default DiscountsList;
