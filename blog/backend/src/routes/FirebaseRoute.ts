import { Router } from "express";
import FirebaseMessageController from "../app/controller/FirebaseMessageController";
import { authMiddleWare } from "../middleware/middleware";
const fireBaseRouter = Router()

fireBaseRouter.get('/api/firebase/message/token/:userId', authMiddleWare, FirebaseMessageController.getFMToken)
fireBaseRouter.post('/api/firebase/message/token', authMiddleWare, FirebaseMessageController.storeToken)

export default fireBaseRouter