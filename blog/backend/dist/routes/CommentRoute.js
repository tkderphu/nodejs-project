"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = __importDefault(require("../app/controller/CommentController"));
const middleware_1 = require("../middleware/middleware");
const commentRouter = (0, express_1.Router)();
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
commentRouter.post('/api/comments', middleware_1.authMiddleWare, CommentController_1.default.createComment);
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
commentRouter.post('/api/comments/post', CommentController_1.default.getAllCommentByPostId);
/**
 * @swagger
 * /api/comments/{id}:
 *  post:
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
commentRouter.delete('/api/comments/:id', middleware_1.authMiddleWare, CommentController_1.default.removeCommentById);
commentRouter.use(middleware_1.handlerExceptionMiddleWare);
exports.default = commentRouter;
