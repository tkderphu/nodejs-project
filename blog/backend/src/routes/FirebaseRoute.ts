import { Router } from "express";
import FirebaseMessageController from "../app/controller/FirebaseMessageController";
import { authMiddleWare } from "../middleware/middleware";
const fireBaseRouter = Router()

fireBaseRouter.put('/api/firebase/message/token',authMiddleWare, FirebaseMessageController.storeToken)

export default fireBaseRouter