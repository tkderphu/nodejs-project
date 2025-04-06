import { Router } from "express";
import NotificationController from "../app/controller/NotificationController";
import { authMiddleWare } from "../middleware/middleware";
const notificationRouter = Router()

notificationRouter.get("/api/notification/messages", authMiddleWare, NotificationController.getAllNotifyMessage)
export default notificationRouter