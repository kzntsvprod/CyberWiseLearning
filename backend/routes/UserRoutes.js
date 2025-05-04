import express from "express";
import {
    updateUser,
    uploadAvatar,
    authMiddleware,
    uploadMiddleware,
    resetPassword,
    markModuleAsViewed,
    getUsers,
    updateUserStatus
} from "../controllers/userController.js";

const router = express.Router();

router.patch("/update", authMiddleware, updateUser);
router.post("/avatar", authMiddleware, uploadMiddleware, uploadAvatar);
router.post("/reset-password", resetPassword);
router.post("/view-module", markModuleAsViewed);
router.get("/users", getUsers);
router.post('/:id/status', updateUserStatus);

export default router;