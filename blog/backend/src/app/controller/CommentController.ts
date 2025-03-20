import { NextFunction, Request, Response } from "express"
import { getUserLoggined } from "../framework/common/auth"
import { CommentPageReqVO, CommentReqVO } from "../model/comment"
import CommentService from "../service/CommentService"


class CommentController {


    createComment(req: any, res: Response, next: NextFunction) {
        const body: CommentReqVO = req.body
        CommentService.createComment(getUserLoggined(req).userId, body).then(response => {
            res.status(200).send(response)
        }).catch(err => {
            next(err)
        })
    }

    getAllCommentByPostId(req: Request, res: Response, next: NextFunction) {
        const { postId } = req.params;
        const { page, limit } = req.query
        //@ts-ignore
        CommentService.getPageCommentByPostId(postId, page, limit).then(response => {
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
        const {id} = req.params
        CommentService.removeCommentById(id, getUserLoggined(req).userId)
            .then(() => {
                res.status(200)
            }).catch(err => {
                next(err)
            })
    }


}
export default new CommentController()