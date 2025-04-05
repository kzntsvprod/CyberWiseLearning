import express from "express";
import { register, login, profileUser, authMiddleware, forgotPassword, resetPassword } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/data", authMiddleware, profileUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;