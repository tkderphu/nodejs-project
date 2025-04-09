import { Router } from "express";
import BookMarkController from "../app/controller/BookMarkController";
import { authMiddleWare, handlerExceptionMiddleWare } from "../middleware/middleware";

const galleryRouter = Router()

galleryRouter.get('/api/galleries/user', authMiddleWare, BookMarkController.getAllBookmarkByUser)

export default galleryRouter