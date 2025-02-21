import { NextFunction, Request, Response } from "express"
import CommentService from "../service/CommentService"


class CommentController {


    async createComment(req: any, res: Response, next: NextFunction) {
        try {
            

        } catch (err) {
            next(err)
        }
    }

    async getAllCommentByPostId(req: Request, res: Response) {
        const postId = req.params['postId']

        res.send("Hello postId: " + postId)
        // const listPost = await this.commentService.getAllCommentByPostId(postId)
        // if(!listPost) {

        // } else {
        //     res.status(200).send(listPost)
        // }
    }

    async removeCommentById(req: Request, res: Response) {
        const commentId = req.params['id']
        const result = await CommentService.removeCommentById(commentId)

        if (!result) {

        } else {
            res.status(200).send("ok")
        }
    }


}
export default new CommentController()