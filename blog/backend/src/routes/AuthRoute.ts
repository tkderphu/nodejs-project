import { Router } from "express";
import AuthController from "../app/controller/AuthController";
const authRouter = Router()

authRouter.post("/api/auth/login", AuthController.login)
authRouter.post("/api/auth/register", AuthController.register)
authRouter.get("/api/auth/refresh-token", AuthController.refreshToken)
authRouter.get("/api/auth/logout", AuthController.logout)
authRouter.get("/api/auth/forget-password", AuthController.forgetPassword)


export default authRouter