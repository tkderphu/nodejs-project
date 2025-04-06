import { Request, Response } from "express";
import { getUserLoggined } from "../framework/common/auth";
import FirebaseService from "../service/FirebaseService";

class FirebaseMessageController {
    storeToken(req: Request, res: Response, next: any) {
        const {token} = req.body
        FirebaseService.storeFMToken(getUserLoggined(req).userId, token).then(resp => {
            res.status(200).send("ok")
        }).catch(err => {
            next(err)
        })
    }
    getFMToken(req: Request, res: Response, next: any) {
        FirebaseService.getFMToken(getUserLoggined(req).userId)
        .then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }

    

}
export default new FirebaseMessageController()