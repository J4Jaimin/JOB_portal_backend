import express from "express";
import { getUserController, updateUserController } from "../controllers/userControllers.js";
import userAuth from "../middlewares/authMiddleWare.js";

const router = express.Router();

// GET User || GET
router.get("/get-user", userAuth, getUserController);

// PUT Update User || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;