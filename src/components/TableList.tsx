import React from "react";

type Column<T> = {
    title: string;
    dataIndex: keyof T;
};

type TableListProps<T> = {
    columns: Column<T>[];
    data: T[];
    onEdit?: (record: T) => void;
    onDelete?: (record: T) => void;
    page?: number;
    pageSize?: number;
    totalItems?: number;
    onPageChange?: (page: number) => void;
};

export function TableList<T extends object>({
    columns,
    data,
    onEdit,
    onDelete,
    page = 1,
    pageSize = 10,
    totalItems,
    onPageChange,
}: TableListProps<T>) {
    const totalPages = totalItems ? Math.ceil(totalItems / pageSize) : 1;
    const paginatedData =
        totalItems && onPageChange
            ? data.slice((page - 1) * pageSize, page * pageSize)
            : data;

    return (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr className="text-left bg-gray-100 dark:bg-gray-700">
                        {columns.map((col) => (
                            <th
                                key={col.dataIndex as string}
                                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 text-lg"
                            >
                                {col.title}
                            </th>
                        ))}
                        <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 text-lg">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, idx) => (
                        <tr
                            key={idx}
                            className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.dataIndex as string}
                                    className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100 text-lg"
                                >
                                    {item[col.dataIndex] as React.ReactNode}
                                </td>
                            ))}
                            <td className="px-4 py-2 gap-2 text-sm text-gray-800 dark:text-gray-100 text-lg">
                                <div className="w-full h-full flex justify-center items-center gap-2">
                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="px-2 py-1 bg-sky-400 text-white rounded hover:bg-sky-300"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(item)}
                                            className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-300"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination Controls */}
            {totalItems && onPageChange && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-gray-700 dark:text-gray-200">
                        Page {page} / {totalPages}
                    </span>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => onPageChange(page + 1)}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
