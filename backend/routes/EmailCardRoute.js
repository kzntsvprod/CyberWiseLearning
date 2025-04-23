import express from "express";
import { getRandomCards } from "../controllers/EmailCardController.js";

const router = express.Router();

router.get('/data', getRandomCards);

export default router;