
import { Router } from "express";
import { auth } from "firebase-admin";
import FollowController from "../app/controller/FollowController";
import { authMiddleWare } from "../middleware/middleware";
const followRoute = Router()

followRoute.post(`/api/follows/:followObjectId/:type`, authMiddleWare ,FollowController.follow)
followRoute.delete(`/api/follows/:followObjectId/:type`, authMiddleWare, FollowController.unfollow)
followRoute.get(`/api/follows/check/:followObjectId/:type`, authMiddleWare, FollowController.checkFollowedObject)
followRoute.get(`/api/follows/:followObjectId/:type/followers`, FollowController.getFollowers)
followRoute.get(`/api/follows/:followObjectId/:type/followings`, FollowController.getFollowings)

export default followRoute