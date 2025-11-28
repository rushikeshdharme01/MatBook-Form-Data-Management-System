import React from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

function SubmissionsTable({ data, onView }) {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("_id", {
      header: "Submission ID",
      cell: (info) => (
        <span className="font-mono text-xs">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toLocaleString();
      },
    }),
    columnHelper.display({
      id: "view",
      header: "View",
      cell: ({ row }) => (
        <button
          onClick={() => onView(row.original)}
          className="px-2 py-1 text-xs bg-slate-900 text-white rounded hover:bg-slate-700"
        >
          View
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasData = (data || []).length > 0;

  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-slate-700">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-2 text-left border-b"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2 border-b">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}

          {!hasData && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-slate-500 text-sm"
              >
                No submissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionsTable;
