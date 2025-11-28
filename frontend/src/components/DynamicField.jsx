import React from "react";

function DynamicField({ fieldDef, fieldApi, error }) {
  const { name, label, type, placeholder, options = [], validations = {} } =
    fieldDef;
  const value = fieldApi.state.value;

  const required = validations.required === true;

  const commonLabel = (
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const commonError =
    error && (
      <p className="mt-1 text-xs text-red-600">
        {error}
      </p>
    );

  let inputEl = null;

  // ---- Render based on type ----
  if (type === "text" || type === "number" || type === "date") {
    inputEl = (
      <input
        type={type === "number" ? "number" : type === "date" ? "date" : "text"}
        value={value ?? ""}
        placeholder={placeholder || ""}
        onChange={(e) => {
          const val =
            type === "number" ? e.target.value : e.target.value;
          fieldApi.handleChange(val);
        }}
        onBlur={fieldApi.handleBlur}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
      />
    );
  } else if (type === "textarea") {
    inputEl = (
      <textarea
        value={value ?? ""}
        placeholder={placeholder || ""}
        onChange={(e) => fieldApi.handleChange(e.target.value)}
        onBlur={fieldApi.handleBlur}
        rows={4}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
      />
    );
  } else if (type === "select") {
    inputEl = (
      <select
        value={value ?? ""}
        onChange={(e) => fieldApi.handleChange(e.target.value)}
        onBlur={fieldApi.handleBlur}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
      >
        <option value="">{placeholder || "Select an option"}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else if (type === "multi-select") {
    inputEl = (
      <select
        multiple
        value={Array.isArray(value) ? value : []}
        onChange={(e) => {
          const selected = Array.from(
            e.target.selectedOptions
          ).map((opt) => opt.value);
          fieldApi.handleChange(selected);
        }}
        onBlur={fieldApi.handleBlur}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 h-24"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else if (type === "switch") {
    inputEl = (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => fieldApi.handleChange(e.target.checked)}
          onBlur={fieldApi.handleBlur}
          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
        />
        <span className="text-sm text-slate-700">{placeholder || ""}</span>
      </label>
    );
  } else {
    // Fallback for unknown type
    inputEl = (
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => fieldApi.handleChange(e.target.value)}
        onBlur={fieldApi.handleBlur}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      />
    );
  }

  return (
    <div className="mb-4">
      {type !== "switch" && commonLabel}
      {inputEl}
      {type === "switch" && commonError && (
        <div className="mt-1">{commonError}</div>
      )}
      {type !== "switch" && commonError}
    </div>
  );
}

export default DynamicField;
