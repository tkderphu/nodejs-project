import { Router } from "express";
import BookMarkController from "../app/controller/BookMarkController";
import { authMiddleWare, handlerExceptionMiddleWare } from "../middleware/middleware";

const bookMarkRouter = Router()

bookMarkRouter.post('/api/bookmarks/:objId/:objType', authMiddleWare, BookMarkController.bookmark)
bookMarkRouter.delete('/api/bookmarks/:objId/:objType', authMiddleWare, BookMarkController.removeBookmark)
bookMarkRouter.get('/api/bookmarks/:objId/:objType', authMiddleWare, BookMarkController.checkBookmarked)
bookMarkRouter.get('/api/bookmarks/user/:userId/:objType', BookMarkController.getBookmarks)

export default bookMarkRouter