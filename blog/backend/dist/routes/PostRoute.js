"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = __importDefault(require("../app/controller/PostController"));
const postRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/posts/like:
 *   put:
 *     tags: [post]
 *     summary: Update like post
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - postId
 *              - userLikeId
 *              - up
 *            properties:
 *              postId:
 *                type: string
 *              userLikeId:
 *                type: string
 *              up:
 *                type: boolean
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
postRouter.put('/api/posts/like', PostController_1.default.updatelikePost);
postRouter.put('/api/posts', PostController_1.default.updatePost);
postRouter.post('/api/posts', PostController_1.default.createPost);
/**
 * @swagger
 * /api/posts/{postId}:
 *  get:
 *     tags: [post]
 *     summary: Delete post
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post id
 *     responses:
 *      200:
 *        description: Ok
 *      500:
 *        description: Server Error
 */
postRouter.delete('/api/posts/:postId', PostController_1.default.deletePost);
/**
 * @swagger
 * /api/posts/query:
 *  get:
 *     tags: [post]
 *     summary: Get all post by condition
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - page
 *              - limit
 *            properties:
 *              page:
 *                type: integer
 *                description: Current page
 *              limit:
 *                type: integer
 *                description: Number item is displayed in 1 page
 *              keyword:
 *                 type: string
 *                 description: Keyword for search post(optional)
 *              taggingId:
 *                 type: string
 *                 description: Tag of post(optional)
 *              userPostId:
 *                 type: string
 *                 description: User created post(optional)
 *              startDate:
 *                 type: string
 *                 description: search from date(startDate and endDate accomplish together)(optional)
 *              endDate:
 *                 type: string
 *                 description: search from date(startDate and endDate accomplish together)(optional)
 *              sort:
 *                 type: object
 *                 description: sort by field(1_asc, -1_desc)(optional)
 *                 default:
 *                    view: -1
 *                    like: 1
 *     responses:
 *      200:
 *        description: List post.
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  currentPage:
 *                      type: integer
 *                      example: 1
 *                  totalPage:
 *                      type: integer
 *                      example: 1
 *                  list:
 *                      type: array
 *                      items:
 *                         type: object
 *                         properties:
 *                             userFullName:
 *                                type: string
 *                             userAvatar:
 *                                type: string
 *                             _id:
 *                                type: string
 *                             thumbnail:
 *                                type: string
 *                             taggingIds:
 *                                type: array
 *                                items:
 *                                   type: string
 *                                   default: 302534
 *                             numShareToSocial:
 *                                type: integer
 *                             userPostId:
 *                                type: string
 *                             createdDate:
 *                                type: string
 *                             view:
 *                                type: integer
 *                             like:
 *                                type: integer
 *      500:
 *        description: Server Error
 */
postRouter.get('/api/posts/query', PostController_1.default.getListPost);
exports.default = postRouter;
