import React from "react";

function ViewModal({ open, onClose, data }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-5">
        <h3 className="text-lg font-semibold mb-3">Submission Details</h3>

        <pre className="bg-slate-100 p-3 rounded text-sm overflow-x-auto">
{JSON.stringify(data, null, 2)}
        </pre>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewModal;
