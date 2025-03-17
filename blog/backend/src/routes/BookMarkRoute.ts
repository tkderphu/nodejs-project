import { Router } from "express";
import BookMarkController from "../app/controller/BookMarkController";
import { authMiddleWare, handlerExceptionMiddleWare } from "../middleware/middleware";

const bookMarkRouter = Router()

bookMarkRouter.post('/api/bookmarks/:entityType/:entityId', authMiddleWare, BookMarkController.bookmark)
bookMarkRouter.get('/api/bookmarks/:entityType/:userId', BookMarkController.getAllBookmarkByUser)

export default bookMarkRouter