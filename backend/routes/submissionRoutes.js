// routes/submissionRoutes.js

const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");
const validateSubmission = require("../utils/validateSubmission");

// POST /api/submissions
// Accepts a form submission, validates it, and stores it.
router.post("/submissions", async (req, res) => {
  const payload = req.body;

  // Validate against schema
  const { valid, errors } = validateSubmission(payload);

  if (!valid) {
    // Validation failure
    return res.status(400).json({
      success: false,
      errors, // { fieldName: "error message" }
    });
  }

  try {
    const submission = await Submission.create({
      data: payload,
      createdAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      id: submission._id,
      createdAt: submission.createdAt,
    });
  } catch (err) {
    console.error("Error saving submission:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to save submission",
    });
  }
});

// GET /api/submissions
// Returns paginated, sortable list of submissions
router.get("/submissions", async (req, res) => {
  try {
    // Query params with defaults
    let page = parseInt(req.query.page, 10);
    let limit = parseInt(req.query.limit, 10);
    let sortBy = req.query.sortBy;
    let sortOrder = req.query.sortOrder;

    if (Number.isNaN(page) || page < 1) page = 1;
    if (Number.isNaN(limit) || limit < 1) limit = 10;

    // We only allow sorting by createdAt as per assignment
    if (sortBy !== "createdAt") {
      sortBy = "createdAt";
    }

    if (sortOrder !== "asc" && sortOrder !== "desc") {
      sortOrder = "desc";
    }

    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    // Fetch items + total count in parallel
    const [items, total] = await Promise.all([
      Submission.find().sort(sort).skip(skip).limit(limit),
      Submission.countDocuments(),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      items,        // each item has _id, data, createdAt
      total,        // total submissions count
      totalPages,   // number of pages
      page,         // current page
      limit,        // page size
      sortBy,
      sortOrder,
    });
  } catch (err) {
    console.error("Error fetching submissions:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
    });
  }
});

module.exports = router;
