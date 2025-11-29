const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: [
      {
        companyName: { type: String, required: true },
        location: { type: String, required: true },
        salary: { type: Number, required: true },
        jobType: {
          type: String,
          required: true,
          enum: [
            "Full-time (On-site)",
            "Part-time (On-site)",
            "Full-time (Remote)",
            "Part-time (Remote)",
          ],
        },
        jobDescription: {
          type: String,
          required: true,
        },
        qualifications: [{ type: String, required: true }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
