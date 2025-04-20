import express from "express";
import { updateUser, uploadAvatar, authMiddleware, uploadMiddleware, resetPassword, markModuleAsViewed } from "../controllers/userController.js";

const router = express.Router();

router.patch("/update", authMiddleware, updateUser);
router.post("/avatar", authMiddleware, uploadMiddleware, uploadAvatar);
router.post("/reset-password", resetPassword);
router.post("/view-module", markModuleAsViewed);

export default router;