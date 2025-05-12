import { Router } from "express";
import TransactionController from "../app/controller/TransactionController";
import { authMiddleWare } from "../middleware/middleware";
const transactionRouter = Router()

transactionRouter.post("/api/transactions", authMiddleWare, TransactionController.createTransaction)
transactionRouter.get("/api/transactions", authMiddleWare, TransactionController.getTransaction)

export default transactionRouter