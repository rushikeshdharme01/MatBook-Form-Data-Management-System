// formSchema.js

// This is the dynamic schema for the "Employee Onboarding" form.
// Backend will return this from GET /api/form-schema
// Frontend will use it to render the form dynamically.

const formSchema = {
  title: "Employee Onboarding Form",
  description: "Collects important information about a new employee.",
  fields: [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      validations: {
        required: true,
        minLength: 3,
        maxLength: 100,
      },
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter age",
      validations: {
        required: true,
        min: 18,
        max: 65,
      },
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      placeholder: "Select department",
      options: [
        { label: "Engineering", value: "engineering" },
        { label: "Human Resources", value: "hr" },
        { label: "Sales", value: "sales" },
        { label: "Operations", value: "operations" },
      ],
      validations: {
        required: true,
      },
    },
    {
      name: "skills",
      label: "Skills",
      type: "multi-select",
      placeholder: "Select skills",
      options: [
        { label: "React", value: "react" },
        { label: "Node.js", value: "node" },
        { label: "SQL", value: "sql" },
        { label: "Communication", value: "communication" },
        { label: "Leadership", value: "leadership" },
      ],
      validations: {
        minSelected: 1,
        maxSelected: 5,
      },
    },
    {
      name: "joiningDate",
      label: "Joining Date",
      type: "date",
      placeholder: "Select joining date",
      validations: {
        required: true,
        minDate: "2020-01-01",
      },
    },
    {
      name: "bio",
      label: "Short Bio",
      type: "textarea",
      placeholder: "Write a short introduction",
      validations: {
        maxLength: 500,
      },
    },
    {
      name: "isRemote",
      label: "Remote Employee",
      type: "switch",
      // usually boolean, no extra validations needed
    },
    {
      name: "employeeCode",
      label: "Employee Code",
      type: "text",
      placeholder: "E.g., EMP123",
      validations: {
        // 4–10 characters, letters, numbers, underscore, hyphen
        regex: "^[A-Za-z0-9_-]{4,10}$",
      },
    },
  ],
};

module.exports = formSchema;
