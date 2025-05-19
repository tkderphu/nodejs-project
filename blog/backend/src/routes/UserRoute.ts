import { Router } from "express";
import UserController from "../app/controller/UserController";
import { authMiddleWare } from "../middleware/middleware";
const userRouter = Router()

userRouter.get("/api/users/:userId", UserController.getUserProfile)
userRouter.put("/api/users/social", authMiddleWare, UserController.updateSocialNetworkPlatform)
userRouter.put("/api/users", authMiddleWare, UserController.updateProfileInfo)
userRouter.get("/api/authors/stats", UserController.getAuthorStats)
export default userRouter