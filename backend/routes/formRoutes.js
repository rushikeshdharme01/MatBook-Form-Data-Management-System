// routes/formRoutes.js

const express = require("express");
const router = express.Router();
const formSchema = require("../formSchema");

// GET /api/form-schema
// Returns the Employee Onboarding form schema
router.get("/form-schema", (req, res) => {
  return res.json(formSchema);
});

module.exports = router;
