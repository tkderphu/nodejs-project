import { Router } from "express";
import PostController from "../app/controller/PostController";
const postRouter = Router()

postRouter.get('/api/posts', PostController.getListPort)
postRouter.get('/api/posts/user/:userId', PostController.getListPortByUserId)
postRouter.get('/api/posts/:postId/like', PostController.likePost)
postRouter.get('/api/posts/:postId/unlike', PostController.unlikePost)
postRouter.get('/api/posts/count/user/:userId', PostController.countPostWasCreatedByUserId)
postRouter.get('/api/posts/search', PostController.searchPostByKeyword)
postRouter.get('/api/posts/tagging/:taggingId', PostController.getListPostByTaggingId)
postRouter.get('/api/posts/disabled/comment', PostController.disabledComment)
postRouter.get('/api/posts/enabled/comment', PostController.enableComment)
postRouter.get('/api/posts/disabled', PostController.disabledPost)
postRouter.get('/api/posts/enabled', PostController.enabledPost)

postRouter.put('/api/posts', PostController.updatePost)
postRouter.post('/api/posts', PostController.createPost)
postRouter.delete('/api/posts/:postId', PostController.deletePost)

export default postRouter