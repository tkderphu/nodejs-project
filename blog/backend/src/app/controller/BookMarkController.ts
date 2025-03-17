import { NextFunction, Request, Response } from "express"
import { getUserLoggined } from "../framework/common/auth"
import { BookMark, BookMarkReq } from "../model/bookmark"
import BookMarkService from "../service/BookMarkService"


class BookMarkController {
    bookmark(req: Request, res: Response, next: NextFunction) {
        const bookmarkRequest: BookMarkReq = {
            entityId: req.params['entityId'],
            userId: getUserLoggined(req).userId,
            entityType: req.params['entityType'] || 'POST'
        }
        BookMarkService.save(bookmarkRequest).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err));
    }
    getAllBookmarkByUser(req: Request, res: Response, next: NextFunction) {
        const userId = req.params['userId']
        const entityType = req.params['entityType']
        BookMarkService.findBookmarkByUser(entityType, userId).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))
    }



}
export default new BookMarkController()