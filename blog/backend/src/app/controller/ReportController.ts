import { Request, Response } from "express";
import { ReportRepository } from "../../db/mongo";
import { getUserLoggined } from "../framework/common/auth";
import { Report } from "../model/report";
import CommentService from "../service/CommentService";
import PostService from "../service/PostService";
import UserService from "../service/UserService";

class ReportController {
    report(req: Request, res: Response, next: any) {
        const { typeId, type, reason } = req.body
        const report: Report = {
            createdAt: new Date(),
            reason: reason,
            type: type,
            typeId: typeId,
            userId: getUserLoggined(req).userId,
            status: "PENDING"
        }
        ReportRepository.insertOne(report).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }

    async getListReport(req: Request, res: Response, next: any) {
        const { type, status } = req.query
        if (type) {
            let result = []
            if (status) {
                result = await ReportRepository.find({ type: type, status: status }).toArray()
            } else {
                result = await ReportRepository.find({ type: type }).toArray()
            }
            for(let x of result) {
                if(type == "POST") {
                    x.post = await PostService.getPostDetail(x.typeId, undefined)
                } else if(type == "COMMENT") {
                    x.comment = await CommentService.getCommentById(x.typeId)
                }
                x.user = await UserService.getProfile(x.userId)
            }
            res.status(200).send(result)
        }
    }
}
export default new ReportController()