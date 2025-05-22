import { Router } from "express";
import SettingController from "../app/controller/SettingController";
import { authMiddleWare } from "../middleware/middleware";
const settingRouter = Router()



settingRouter.put("/api/settings/notification", authMiddleWare, SettingController.updateNotify)
settingRouter.get("/api/settings", authMiddleWare, SettingController.getSetting)
export default settingRouter