import { Request, Response } from "express";
import { ReportRepository } from "../../db/mongo";
import { getUserLoggined } from "../framework/common/auth";
import { Report } from "../model/report";

class ReportController {
    report(req: Request, res: Response, next: any) {
        const {typeId, type, reason} = req.body
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

    getListReport(req: Request, res: Response, next: any) {
        const {type, status} = req.query
        if(type) {
            if(status) {
                ReportRepository.find({type: type, status: status}).toArray().then(resp => {
                    res.status(200).send(resp)
                }).catch(err => next(err))
            } else {
                ReportRepository.find({type: type}).toArray().then(resp => {
                    res.status(200).send(resp)
                }).catch(err => next(err))
            }
        } else {
            if(status) {
                ReportRepository.find({status: status}).toArray().then(resp => {
                    res.status(200).send(resp)
                }).catch(err => next(err))
            } else {
                ReportRepository.find({}).toArray().then(resp => {
                    res.status(200).send(resp)
                }).catch(err => next(err))
            }
        }
    }
}
export default new ReportController()