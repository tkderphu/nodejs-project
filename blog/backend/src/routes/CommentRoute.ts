import { Router } from "express";
import CommentController from "../app/controller/CommentController";
const commentRouter = Router()

commentRouter.post('/api/comments', CommentController.createComment)
commentRouter.get('/api/comments/post/:postId', CommentController.getAllCommentByPostId)
commentRouter.delete('/api/comments/:id', CommentController.removeCommentById)

export default commentRouter