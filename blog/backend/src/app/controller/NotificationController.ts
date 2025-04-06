import { Request, Response } from "express"
import { getUserLoggined } from "../framework/common/auth"
import NotificationService from "../service/NotificationService"

class NotificationController {
    
    getAllNotifyMessage(req: Request, res: Response, next: any) {
        NotificationService.getListNotifyMessage(getUserLoggined(req).userId)
        .then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }
}
export default new NotificationController