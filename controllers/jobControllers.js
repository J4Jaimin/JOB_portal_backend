import jobModel from "../models/jobModel.js";

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

export const getJobController = async (req, res, next) => {
    const jobs = await jobModel.find({ createdBy: req.user.userId });
    const total_jobs = jobs.length;

    res.status(201).send({
        total_jobs,
        jobs,
    });
}