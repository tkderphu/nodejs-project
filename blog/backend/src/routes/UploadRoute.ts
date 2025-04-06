import { Router } from "express";
import UploadController from "../app/controller/UploadController";
import { authMiddleWare, parseFileMiddleWare } from "../middleware/middleware";
const uploadRouter = Router()

uploadRouter.post('/api/uploads',authMiddleWare, parseFileMiddleWare.single('file'), UploadController.uploadFile)

export default uploadRouter