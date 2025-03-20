import { NextFunction, Request, Response } from "express"
import { getUserLoggined } from "../framework/common/auth"
import { BookMark, BookMarkReq } from "../model/bookmark"
import BookMarkService from "../service/BookMarkService"


class BookMarkController {
    bookmark(req: Request, res: Response, next: NextFunction) {
        const {objectId, type} = req.body
        const bookmarkReq: BookMarkReq = {
            objectId: objectId,
            type: type || 'POSTS',
        }

        BookMarkService.save(getUserLoggined(req).userId ,bookmarkReq).then(resp => {
            res.status(200).send("ok")
        }).catch(err => {
            next(err)
        })
    }

    getAllBookmarkByUser(req: Request, res: Response, next: NextFunction) {
        const {userId, type} = req.params
        const {sortBy} = req.query
        //@ts-ignore
        BookMarkService.findAllBookmark(userId, type, sortBy).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))
    }

    removeBookmark(req: Request, res: Response, next: NextFunction) {
        const {bookmarkId} = req.params
        BookMarkService.remove(getUserLoggined(req).userId, bookmarkId).then(resp => {
            res.status(200).send("ok")
        }).catch(err => {
            next(err)
        })
    }

    isCurrentUserBookmarkedThisObject(req: Request, res: Response, next: any) {
        const {type, objectId} = req.params
        //@ts-ignore
        BookMarkService.isObjectBookmarked(getUserLoggined(req).userId, type, objectId).then(resp => {
            res.status(200).send("ok")
        }).catch(err => {
            next(err)
        })

    }


}
export default new BookMarkController()