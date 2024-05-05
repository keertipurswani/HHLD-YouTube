import express from "express"
import watchVideo from "../controllers/watch.controller.js";
import getAllVideos from "../controllers/home.controller.js";

const router = express.Router();

router.get('/', watchVideo);
router.get('/home', getAllVideos);

export default router;
