import { Router } from "express";
import GalleryController from "../app/controller/GalleryController";
import { authMiddleWare } from "../middleware/middleware";

const galleryRouter = Router()

galleryRouter.get('/api/galleries/user', authMiddleWare, GalleryController.getListGallery)

export default galleryRouter