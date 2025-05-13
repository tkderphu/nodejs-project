import { Router } from "express";
import FlowerController from "../app/controller/FlowerController";
import { authMiddleWare } from "../middleware/middleware";
const flowerRouter = Router()

flowerRouter.get("/api/flowers/user", authMiddleWare, FlowerController.getFlower)

export default flowerRouter