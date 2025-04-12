import express from "express";
import {getModuleById, getModules} from "../controllers/ModuleController.js";

const router = express.Router();

router.get("/data", getModules);
router.get("/data/:id", getModuleById)

export default router;