import express from "express";
import userAuth from '../middlewares/authMiddleWare.js';
import { createJobController, getJobController } from "../controllers/jobControllers.js";

const router = express.Router()

// routes
// CREATE JOB || POST

router.post("/create-job", userAuth, createJobController);
router.post("/get-job", userAuth, getJobController);

export default router;