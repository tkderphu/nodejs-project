import { Router } from "express";
import LikeController from "../app/controller/LikeController";
import { authMiddleWare } from "../middleware/middleware";

const likeRouter = Router()

likeRouter.post('/api/likes/:objId/:objType', authMiddleWare, LikeController.like)
likeRouter.delete('/api/likes/:objId/:objType', authMiddleWare,LikeController.unlike)
likeRouter.get('/api/likes/check/:userId/:objId/:objType', LikeController.checkLike)

export default likeRouter