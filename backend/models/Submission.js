// models/Submission.js

const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    // Store the entire form data as a flexible object
    data: {
      type: Object,
      required: true,
    },
    // createdAt will be stored explicitly so we can sort/paginate on it
    createdAt: {
      type: Date,
      default: () => new Date(),
      index: true,
    },
  },
  {
    // We are explicitly managing createdAt, so no timestamps:true
    timestamps: false,
  }
);

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;
