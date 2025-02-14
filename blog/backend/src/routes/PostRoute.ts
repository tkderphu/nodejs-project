import { Router } from "express";
import PostController from "../app/controller/PostController";
const router = Router()

router.get('/api/posts', PostController.getListPort)
router.get('/api/posts/user/:userId', PostController.getListPortByUserId)
router.get('/api/posts/:postId/like', PostController.likePost)
router.get('/api/posts/:postId/unlike', PostController.unlikePost)
router.get('/api/posts/count/user/:userId', PostController.countPostWasCreatedByUserId)
router.get('/api/posts/search', PostController.searchPostByKeyword)
router.get('/api/posts/tagging/:taggingId', PostController.getListPostByTaggingId)
router.get('/api/posts/disabled/comment', PostController.disabledComment)
router.get('/api/posts/enabled/comment', PostController.enableComment)
router.get('/api/posts/disabled', PostController.disabledPost)
router.get('/api/posts/enabled', PostController.enabledPost)

router.put('/api/posts', PostController.updatePost)
router.post('/api/posts', PostController.createPost)
router.delete('/api/posts/:postId', PostController.deletePost)