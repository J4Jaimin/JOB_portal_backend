import express from "express";
import userAuth from '../middlewares/authMiddleWare.js';
import { createJobController, deleteJobController, getJobController, updateJobController } from "../controllers/jobControllers.js";

const router = express.Router()

// routes

// CREATE JOB || POST
router.post("/create-job", userAuth, createJobController);

// GET JOB || GET
router.get("/get-job", userAuth, getJobController);

// UPDATE JOB || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

// UPDATE JOB || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

export default router;