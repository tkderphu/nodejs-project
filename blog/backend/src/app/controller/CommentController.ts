import { NextFunction, Request, Response } from "express"
import { getUserLoggined } from "../framework/common/auth"
import { CommentRespVO } from "../model/comment"
import CommentService from "../service/CommentService"


class CommentController {


    createComment(req: any, res: Response, next: NextFunction) {
        const body = req.body
        CommentService.createComment(body).then(response => {
            const commentResp: CommentRespVO = {
                ...body,
                id: response.insertedId
            }
            res.status(200).send(commentResp)
        }).catch(err => {
            next(err)
        })
    }

    getAllCommentByPostId(req: Request, res: Response, next: NextFunction) {
        const body = req.body
        CommentService.getPageCommentByPostId(body).then(response => {
            const resp = response.map(comment => {
                return {
                    ...comment,
                    id: comment._id.toString()
                }
            })
            res.send(resp)
        }).catch(err => next(err))
    }

    removeCommentById(req: Request, res: Response, next: NextFunction) {
        const commentId = req.params['id']
        CommentService.removeCommentById(commentId, getUserLoggined(req).userId)
            .then(() => {
                res.status(200)
            }).catch(err => {
                next(err)
            })
    }


}
export default new CommentController()