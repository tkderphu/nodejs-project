import { Router } from "express";
import CommentController from "../app/controller/CommentController";
import { authMiddleWare, handlerExceptionMiddleWare } from "../middleware/middleware";
const commentRouter = Router()


/**
 * @swagger
 * /api/comments:
 *  post:
 *     tags: [post]
 *     summary: Create comment
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - userId
 *              - content
 *              - postId
 *            properties:
 *              userId:
 *                type: string
 *                default: 12353fds
 *              content:
 *                type: string
 *                default: post ok
 *              postId:
 *                type: string
 *                default: 938fej
 *              replyCommentId:
 *                type: string
 *     responses:
 *      200:
 *        description: Created successfully
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                      type: string
 *                  userId: 
 *                      type: string
 *                  postId: 
 *                      type: string
 *                  createdDate: 
 *                      type: string
 *                  content:
 *                      type: string
 *                  replyCommentId:
 *                      type: string
 *                  fileUrls: 
 *                      type: array
 *      500:
 *        description: Server Error
 */
commentRouter.post('/api/comments', authMiddleWare, CommentController.createComment)


/**
 * @swagger
 * /api/comments/post:
 *  post:
 *     tags: [post]
 *     summary: Get page comment
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - postId
 *              - page
 *              - limit
 *            properties:
 *              postId:
 *                type: string
 *                default: 12353fds
 *              page:
 *                type: integer
 *                default: 1
 *              limit:
 *                type: integer
 *                default: 10
 *     responses:
 *      200:
 *        description: ok
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  currentPage:
 *                      type: integer
 *                  totalPage: 
 *                      type: integer
 *                  list: 
 *                      type: array
 *                      items:
 *                        schema:
 *                          type: object
 *                          properties:
 *                           id:
 *                              type: string
 *                           userId: 
 *                              type: string
 *                           postId: 
 *                              type: string
 *                           createdDate: 
 *                              type: string
 *                           content:
 *                             type: string
 *                           replyCommentId:
 *                             type: string
 *                           fileUrls: 
 *                             type: array

 *      500:
 *        description: Server Error
 */
commentRouter.get('/api/comments/post/:postId', CommentController.getAllCommentByPostId)



/**
 * @swagger
 * /api/comments/{id}:
 *  delete:
 *     tags: [post]
 *     summary: Create comment
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id comment
 *     responses:
 *      200:
 *        description: Deleted successfully
 *      500:
 *        description: Server Error
 */
commentRouter.delete('/api/comments/:id', authMiddleWare, CommentController.removeCommentById)


export default commentRouter