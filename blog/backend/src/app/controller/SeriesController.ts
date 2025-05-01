import { NextFunction, Request, Response } from "express";
import { getUserLoggined } from "../framework/common/auth";
import SeriesService from "../service/SeriesService";

class SeriesController {
    createSeries(req: Request, res: Response, next: NextFunction) {
        const { title, content, tagNames,    displayUrl, description} = req.body
        SeriesService.save(getUserLoggined(req).userId, title, content, tagNames, displayUrl, description).then(resp => {
            res.status(200).send("create new series")
        }).catch(err => {
            next(err)
        })
    }
    getListSeries(req: any, res: any, next: NextFunction) {
        //@ts-ignore
        const sortDate = Number.parseInt(req.query.sortDate) || -1
        const page = Number.parseInt(req.query.page) || 1
        const limit = Number.parseInt(req.query.limit) || 10
        //@ts-ignore
        SeriesService.getListSeries(page, limit, sortDate).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }
}
export default new SeriesController()