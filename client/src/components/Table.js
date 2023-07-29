import React from "react";

const Table = ({ data, config, keyFn }) => {
    const renderedColumns = config.map((column) => {
        if (column.header) {
            return (
                <React.Fragment key={column.label}>
                    {column.header()}
                </React.Fragment>
            );
        }
        return <th key={column.label}>{column.label}</th>;
    });

    const renderedRows = data.map((rowData) => {
        const renderedCells = config.map((column) => {
            return (
                <td key={column.label} className="p-4">
                    {column.render(rowData)}
                </td>
            );
        });

        return (
            <tr key={keyFn(rowData)} className="border-b">
                {renderedCells}
            </tr>
        );
    });

    return (
        <table className="table-auto">
            <thead>
                <tr className="border-b-2">{renderedColumns}</tr>
            </thead>
            <tbody>{renderedRows}</tbody>
        </table>
    );
};

export default Table;
