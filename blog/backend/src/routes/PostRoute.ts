import { Router } from "express";
import PostController from "../app/controller/PostController";
const postRouter = Router()



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
postRouter.put('/api/posts/like', PostController.updatelikePost)

/**
 * @swagger
 * /api/posts/count/user/{userId}:
 *  get:
 *     tags: [post]
 *     summary: Count numb post was created by user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId
 *     responses:
 *      200:
 *        description: ok
 *        content:
 *          application/json:
 *              schema:
 *                  type: integer
 *                  example: 5
 *      500:
 *        description: Server Error
 */
postRouter.get('/api/posts/count/user/:userId', PostController.countPostWasCreatedByUserId)

postRouter.get('/api/posts/disabled/comment', PostController.disabledComment)
postRouter.get('/api/posts/enabled/comment', PostController.enableComment)
postRouter.get('/api/posts/disabled', PostController.disabledPost)
postRouter.get('/api/posts/enabled', PostController.enabledPost)



postRouter.put('/api/posts', PostController.updatePost)




postRouter.post('/api/posts', PostController.createPost)





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
postRouter.delete('/api/posts/:postId', PostController.deletePost)



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
postRouter.get('/api/posts/query', PostController.getListPost)

export default postRouter