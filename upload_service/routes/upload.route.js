import express from "express";
import { initializeUpload, uploadChunk, completeUpload, uploadToDb } from "../controllers/multipartupload.controller.js";
import multer from 'multer';
const upload = multer();

const router = express.Router();

// Route for initializing upload
router.post('/initialize', upload.none(), initializeUpload);

// Route for uploading individual chunks
router.post('/', upload.single('chunk'), uploadChunk);

// Route for completing the upload
router.post('/complete', completeUpload);

router.post('/uploadToDb', uploadToDb);

export default router;
