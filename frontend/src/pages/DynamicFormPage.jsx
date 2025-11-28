import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import DynamicField from "../components/DynamicField";

function DynamicFormPage() {
  const {
    data: schema,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["form-schema"],
    queryFn: async () => {
      const res = await api.get("/form-schema");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-4 w-32 bg-slate-200 rounded mb-2 animate-pulse" />
        <div className="h-3 w-64 bg-slate-200 rounded mb-4 animate-pulse" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">
          Failed to load form schema
        </h2>
        <p className="text-sm text-red-600">
          {error?.message || "Something went wrong while fetching the form."}
        </p>
      </div>
    );
  }

  return <DynamicForm schema={schema} />;
}

function DynamicForm({ schema }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [serverErrors, setServerErrors] = React.useState({});
  const [serverMessage, setServerMessage] = React.useState(null);

  // Prepare default values from schema
  const defaultValues = React.useMemo(() => {
    const values = {};
    schema.fields.forEach((field) => {
      if (field.type === "multi-select") {
        values[field.name] = [];
      } else if (field.type === "switch") {
        values[field.name] = false;
      } else {
        values[field.name] = "";
      }
    });
    return values;
  }, [schema]);

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value, formApi }) => {
      setServerErrors({});
      setServerMessage(null);
      try {
        const res = await api.post("/submissions", value);

        // Success
        setServerMessage("Form submitted successfully!");
        // Reset form values
        formApi.reset();

        // Invalidate submissions query so table refetches latest
        queryClient.invalidateQueries({ queryKey: ["submissions"] });

        // Navigate to submissions page after short delay
        setTimeout(() => {
          navigate("/submissions");
        }, 800);
      } catch (err) {
        const status = err?.response?.status;
        const data = err?.response?.data;

        if (status === 400 && data?.errors) {
          // Validation errors from backend
          setServerErrors(data.errors);
          setServerMessage("Please fix the errors highlighted below.");
        } else {
          setServerMessage(
            data?.message || "Something went wrong. Please try again."
          );
        }
      }
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-1">{schema.title}</h2>
      <p className="text-sm text-slate-600 mb-5">{schema.description}</p>

      {serverMessage && (
        <div
          className={`mb-4 text-sm rounded-md px-3 py-2 ${
            Object.keys(serverErrors).length > 0
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          {serverMessage}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {schema.fields.map((fieldDef) => (
          <form.Field key={fieldDef.name} name={fieldDef.name}>
            {(fieldApi) => (
              <DynamicField
                fieldDef={fieldDef}
                fieldApi={fieldApi}
                error={serverErrors[fieldDef.name]}
              />
            )}
          </form.Field>
        ))}

        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
        >
          {([isSubmitting]) => (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white ${
                isSubmitting
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

export default DynamicFormPage;
