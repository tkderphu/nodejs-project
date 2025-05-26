import { Router } from "express";
import ReportController from "../app/controller/ReportController";
import { authMiddleWare } from "../middleware/middleware";
const reportRouter = Router()


reportRouter.post("/api/reports", authMiddleWare, ReportController.report)
reportRouter.get("/api/reports", authMiddleWare, ReportController.getListReport)

export default reportRouter
