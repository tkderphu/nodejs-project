import { Router } from "express";
import UserController from "../app/controller/UserController";
const userRouter = Router()

userRouter.get("/api/users/:userId", UserController.getUserProfile)


export default userRouter