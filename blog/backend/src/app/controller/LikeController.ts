import { Request, Response } from "express";
import { LikeRepository } from "../../db/mongo";
import { getUserLoggined } from "../framework/common/auth";

class LikeController {
    async like(req: Request, res: Response, next: any) {
        const { objType, objId } = req.params
        await LikeRepository.insertOne({
            userId: getUserLoggined(req).userId,
            objType: objType,
            objId: objId
        })
        res.status(200).send(true)
    }
    async unlike(req: Request, res: Response, next: any) {
        const { objType, objId } = req.params
        await LikeRepository.deleteMany({
            userId: getUserLoggined(req).userId,
            objType: objType,
            objId: objId
        })
        res.status(200).send(true)
    }

    async checkLike(req: any, res: any, next: any) {
        const { userId, objType, objId } = req.params
        const result = await LikeRepository.findOne({
            userId: userId,
            objType: objType,
            objId: objId
        })

        if (result) {
            res.status(200).send(true)
        } else {
            res.status(200).send(false)
        }
    }


}
export default new LikeController()