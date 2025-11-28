import React from "react";
import { useSubmissions } from "../hooks/useSubmissions";
import SubmissionsTable from "../components/SubmissionsTable";
import ViewModal from "../components/ViewModal";

function SubmissionsPage() {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [sortOrder, setSortOrder] = React.useState("desc");

  const { data, isLoading, isError } = useSubmissions({
    page,
    limit,
    sortOrder,
  });

  const [viewData, setViewData] = React.useState(null);

  if (isLoading) {
    return (
      <div className="text-slate-600 text-sm">
        Loading submissions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600">
        Failed to load submissions.
      </div>
    );
  }

  const items = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Form Submissions</h2>

        {/* Sort Order */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-slate-300 px-2 py-1 text-sm rounded"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Table */}
      <SubmissionsTable
        data={items}
        onView={(item) => setViewData(item)}
      />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Page Info */}
        <div className="text-sm text-slate-600">
          Page {page} of {totalPages}
        </div>

        {/* Limit Selector */}
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="border border-slate-300 px-2 py-1 text-sm rounded"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      {/* Modal */}
      <ViewModal
        open={!!viewData}
        onClose={() => setViewData(null)}
        data={viewData}
      />
    </div>
  );
}

export default SubmissionsPage;
