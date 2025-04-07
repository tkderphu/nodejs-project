import { Router } from "express";
import NotificationController from "../app/controller/NotificationController";
import { authMiddleWare } from "../middleware/middleware";
const notificationRouter = Router()

notificationRouter.get("/api/notify-messages/user", authMiddleWare, NotificationController.getAllNotifyMessage)
notificationRouter.get("/api/notify-messages/user/count/unread", authMiddleWare, NotificationController.getUnreadMessage)
notificationRouter.put("/api/notify-messages/user/read/:messageId", authMiddleWare, NotificationController.readMessage)
notificationRouter.put("/api/notify-messages/user/read/all", authMiddleWare, NotificationController.readAllMessage)
export default notificationRouter