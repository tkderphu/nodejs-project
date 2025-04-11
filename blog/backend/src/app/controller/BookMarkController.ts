import { NextFunction, Request, Response } from "express"
import { getUserLoggined } from "../framework/common/auth"
import BookMarkService from "../service/BookMarkService"


class BookMarkController {
    bookmark(req: Request, res: Response, next: NextFunction) {
        const {objId, objType} = req.params
        BookMarkService.save(getUserLoggined(req).userId ,objId, objType).then(resp => {
            res.status(200).send("bookmark ok")
        }).catch(err => {
            next(err)
        })
    }

    getBookmarks(req: Request, res: Response, next: NextFunction) {
        const {userId, objType} = req.params
        //@ts-ignore
        BookMarkService.getBookmarks(userId, objType).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }

    removeBookmark(req: Request, res: Response, next: NextFunction) {
        const {objId, objType} = req.params
        BookMarkService.remove(getUserLoggined(req).userId, objId, objType).then(resp => {
            res.status(200).send("remove bookmark ok")
        }).catch(err => {
            next(err)
        })
    }

    checkBookmarked(req: Request, res: Response, next: any) {
        const {objId, objType} = req.params
        //@ts-ignore
        BookMarkService.checkBookmarked(getUserLoggined(req).userId, objId, objType).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })

    }


}
export default new BookMarkController()