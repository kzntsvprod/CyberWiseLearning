import express from "express";
import { register, login, profileUser, authMiddleware } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/data", authMiddleware, profileUser);

export default router;