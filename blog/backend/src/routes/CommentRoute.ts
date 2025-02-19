import { Router } from "express";
import CommentController from "../app/controller/CommentController";
import { authMiddleWare, handlerExceptionMiddleWare } from "../middleware/middleware";
const commentRouter = Router()

commentRouter.post('/api/comments', authMiddleWare, CommentController.createComment)
commentRouter.get('/api/comments/post/:postId', CommentController.getAllCommentByPostId)
commentRouter.delete('/api/comments/:id', CommentController.removeCommentById)


commentRouter.use(handlerExceptionMiddleWare)

export default commentRouter