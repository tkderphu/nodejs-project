import { Request, Response } from "express";
import { SettingRepository } from "../../db/mongo";
import { getUserLoggined } from "../framework/common/auth";

class SettingController {
    async updateNotify(req: Request, res: Response, next: any) {
        let setting = await SettingRepository.findOne({
            userId: getUserLoggined(req).userId
        })
        if(!setting) {
            await SettingRepository.insertOne({
                userId: getUserLoggined(req).userId,
                notification: req.body
            })
        }
        await SettingRepository.updateOne({
            userId: getUserLoggined(req).userId
        }, {
            $set: {
                notification: req.body
            }
        })
        res.status(200).send({msg: "ok"})
    }
    getSetting(req: any, res: any, next: any) {
        SettingRepository.findOne({
            userId: getUserLoggined(req).userId
        }).then(resp => {
            console.log("data setting:", resp)
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }
}   
export default new SettingController()