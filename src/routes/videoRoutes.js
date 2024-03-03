import express from "express";
import { addVideo } from "../controllers/videoController.js";

const router = express.Router();

// Add new video
router.post("/video", addVideo);

export default router;