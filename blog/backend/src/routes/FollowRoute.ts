
import { Router } from "express";
import FollowController from "../app/controller/FollowController";
const followRoute = Router()

followRoute.post(`/api/follows/:followObjectId/:type`, FollowController.follow)
followRoute.delete(`/api/follows/:followObjectId/:type`, FollowController.unfollow)
followRoute.get(`/api/follows/check/:followObjectId/:type`, FollowController.checkFollowedObject)
followRoute.get(`/api/follows/:followObjectId/:type/followers`, FollowController.getFollowers)
followRoute.get(`/api/follows/:followObjectId/:type/followings`, FollowController.getFollowings)

export default followRoute