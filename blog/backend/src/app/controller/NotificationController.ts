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
    countUnreadNotify(req: Request, res: Response, next: any) {
        NotificationService.countUnreadNotifyMessage(getUserLoggined(req).userId)
        .then(result => {
            res.status(200).json(result)
        }).catch(err => next(err))
    }
    readMessage(req: Request, res: Response, next: any) {
        const {messageId} = req.params
        console.log("update request")
        NotificationService.readNotifyMessage(
            messageId, getUserLoggined(req).userId
        ).then(resp => {
            res.status(200).send("ok")
        }).catch(err => next(err))
    }
    readAllMessage(req: Request, res: Response, next: any) {
        NotificationService.readAllNotifyMessage(getUserLoggined(req).userId)
        .then(resp => {
            res.status(200).send("ok")
        }).catch(err => next(err))
    }
    
}
export default new NotificationController()