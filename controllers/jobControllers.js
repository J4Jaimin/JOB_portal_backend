import jobModel from "../models/jobModel.js";
import mongoose from "mongoose";

// ===================== CREATE JOB ========================
export const createJobController = async (req, res, next) => {
    const { company, position } = req.body;

    console.log(req.body);

    if (!company || !position) {
        next('Please Provide All Fields.');
    }

    req.body.createdBy = req.user.userId;

    const job = await jobModel.create(req.body);

    res.status(201).send({
        success: true,
        job,
    });
}

// ====================== GET ALL JOB =======================
export const getJobController = async (req, res, next) => {
    const jobs = await jobModel.find({ createdBy: req.user.userId });
    const total_jobs = jobs.length;

    res.status(201).send({
        total_jobs,
        jobs,
    });
}

// ======================= UPDATE JOB ========================
export const updateJobController = async (req, res, next) => {
    const { company, position } = req.body;

    if (!company || !position) {
        return next("Please provide all fields.");
    }

    const { id } = req.params

    const job = await jobModel.findOne({ _id: id });

    console.log(job);

    if (!job) {
        return next("No job found with this id..");
    }

    if (!req.user.userId === job.createdBy.toString()) {
        return next("You are not authorized to update this job.");
    }

    const updateJob = await jobModel.findByIdAndUpdate({ _id: id }, req.body,
        {
            new: true,
            runValidators: true
        });

    res.status(201).send({
        success: true,
        updateJob,
    });
}

// ======================= DELETE JOB ========================
export const deleteJobController = async (req, res, next) => {

    const id = new mongoose.Types.ObjectId(req.params.id);
    const job = await jobModel.findOne({ _id: id });

    console.log(job);

    await job.deleteOne();

    await job.save();

    res.status(201).send({
        success: true,
    });
}