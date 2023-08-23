import useSort from "../hooks/use-sort";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import Table from "./Table";

const SortableTable = (props) => {
    const { config, data } = props;
    const { setSortColumn, sortBy, sortOrder, sortedData } = useSort(
        config,
        data
    );

    const updatedConfig = config.map((column) => {
        if (!column.sortValue) {
            return column;
        }

        return {
            ...column,
            header: () => (
                <th
                    className="cursor-pointer"
                    onClick={() => setSortColumn(column.label)}
                >
                    <div className="flex items-center">
                        {getIcon(column.label, sortBy, sortOrder)}
                        {column.label}
                    </div>
                </th>
            ),
        };
    });

    return (
        <div>
            <Table {...props} data={sortedData} config={updatedConfig} />
        </div>
    );
};

const getIcon = (label, sortBy, sortOrder) => {
    if (label !== sortBy) {
        return (
            <div>
                <GoArrowUp />
                <GoArrowDown />
            </div>
        );
    } else if (sortOrder === "asc") {
        return (
            <div>
                <GoArrowDown />
            </div>
        );
    } else if (sortOrder === "desc") {
        return (
            <div>
                <GoArrowUp />
            </div>
        );
    }
};

export default SortableTable;
