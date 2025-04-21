
import { Router } from "express";
import { auth } from "firebase-admin";
import FollowController from "../app/controller/FollowController";
import { authMiddleWare } from "../middleware/middleware";
const followRoute = Router()

followRoute.post(`/api/follows/:followObjectId/:type`, authMiddleWare ,FollowController.follow)
followRoute.delete(`/api/follows/:followObjectId/:type`, authMiddleWare, FollowController.unfollow)
followRoute.get(`/api/follows/check/:followObjectId/:type`, authMiddleWare, FollowController.checkFollowedObject)
followRoute.get(`/api/follows/:userId/followers/:type`, FollowController.getFollowers)
followRoute.get(`/api/follows/:userId/followings/:type`, FollowController.getFollowings)

export default followRoute