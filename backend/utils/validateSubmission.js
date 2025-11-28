// utils/validateSubmission.js

// This function validates a submission payload against the form schema.
// It returns:
// { valid: true, errors: {} } OR
// { valid: false, errors: { fieldName: "error message" } }

const formSchema = require("../formSchema");

function validateSubmission(payload) {
  const errors = {};
  const fields = formSchema.fields || [];

  for (const field of fields) {
    const { name, label, type, validations = {} } = field;
    const value = payload[name];

    const {
      required,
      minLength,
      maxLength,
      regex,
      min,
      max,
      minDate,
      minSelected,
      maxSelected,
    } = validations;

    // ---------- REQUIRED CHECK ----------
    if (required) {
      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        errors[name] = `${label} is required`;
        // If required failed, no need to run other validations for this field
        continue;
      }
    }

    // If value is empty and not required -> skip further validations
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue;
    }

    // ---------- TYPE-SPECIFIC & RULE-BASED VALIDATIONS ----------

    // TEXT & TEXTAREA
    if (type === "text" || type === "textarea") {
      const str = String(value);

      if (minLength !== undefined && str.length < minLength) {
        errors[name] = `${label} must be at least ${minLength} characters`;
      }

      if (maxLength !== undefined && str.length > maxLength) {
        errors[name] = `${label} must be at most ${maxLength} characters`;
      }

      if (regex) {
        try {
          const reg = new RegExp(regex);
          if (!reg.test(str)) {
            errors[name] = `${label} format is invalid`;
          }
        } catch (e) {
          console.error(`Invalid regex for field "${name}":`, regex, e);
        }
      }
    }

    // NUMBER
    if (type === "number") {
      const num = Number(value);

      if (Number.isNaN(num)) {
        errors[name] = `${label} must be a valid number`;
      } else {
        if (min !== undefined && num < min) {
          errors[name] = `${label} must be at least ${min}`;
        }
        if (max !== undefined && num > max) {
          errors[name] = `${label} must be at most ${max}`;
        }
      }
    }

    // DATE
    if (type === "date") {
      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        errors[name] = `${label} must be a valid date`;
      } else if (minDate) {
        const minD = new Date(minDate);
        if (date < minD) {
          errors[name] = `${label} must be on or after ${minDate}`;
        }
      }
    }

    // MULTI-SELECT
    if (type === "multi-select") {
      const arr = Array.isArray(value) ? value : [];

      if (minSelected !== undefined && arr.length < minSelected) {
        errors[name] = `Select at least ${minSelected} option(s) for ${label}`;
      }

      if (maxSelected !== undefined && arr.length > maxSelected) {
        errors[name] = `Select at most ${maxSelected} option(s) for ${label}`;
      }
    }

    // SWITCH / SELECT don't need extra generic checks here,
    // but you can add custom logic if needed later.
  }

  const valid = Object.keys(errors).length === 0;

  return { valid, errors };
}

module.exports = validateSubmission;
