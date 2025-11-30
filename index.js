const { initializeDatabase } = require("./db/db.connect");
require("dotenv").config();
const Job = require("./models/job.models");
const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

initializeDatabase();

const createJob = async (newJob) => {
  try {
    const job = new Job(newJob);
    const saveJob = await job.save();
    return saveJob;
  } catch (error) {
    throw error;
  }
};

app.post("/jobs", async (req, res) => {
  try {
    const savedJob = await createJob(req.body);
    console.log(savedJob);

    res
      .status(201)
      .json({ message: "New Job created successfully!", savedJob });
  } catch (error) {
    console.log("Error in creating a new job", error);
    res.status(500).json({ error: "Failed to create new job." });
  }
});

const readAllJobs = async (filters = {}) => {
  try {
    const query = {};

    if (filters.title) {
      query.title = {
        $regex: filters.title,
        $options: "i", // case-insensitive
      };
    }
    const allJobs = await Job.find(query);
    return allJobs;
  } catch (error) {
    throw error;
  }
};

app.get("/jobs", async (req, res) => {
  try {
    const filters = {
      title: req.query.title,
    };

    const allJobs = await readAllJobs(filters);

    if (allJobs.length > 0) {
      res.status(200).json(allJobs);
    } else {
      res.status(404).json({ error: "No jobs found." });
    }
  } catch (error) {
    console.error("Failed to fetch jobs", error);
    res.status(500).json({ error: "An error occured while fetching jobs." });
  }
});

const readJobById = async (jobId) => {
  try {
    const jobById = await Job.findById(jobId);
    return jobById;
  } catch (error) {
    throw error;
  }
};

app.get("/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await readJobById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job by id", error);
    res
      .status(500)
      .json({ error: "An error occured while fetching job by id" });
  }
});

const deleteJob = async (jobId) => {
  try {
    const deleteJob = await Job.findByIdAndDelete(jobId);
    return deleteJob;
  } catch (error) {
    throw error;
  }
};

app.delete("/jobs/:id", async (req, res) => {
  try {
    const deletedJob = await deleteJob(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ message: "Job Deleted successfully!", deletedJob });
  } catch (error) {
    console.error("Error in deleting job", error);
    res
      .status(500)
      .json({ error: "An error occured while deleteing the job." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
