import { Request, Response } from "express"
import CommentService from "../service/CommentService"


class CommentController {
    private commentService = CommentService

    async createComment(req: Request, res: Response) {
        const body = req.body
        const result = await this.commentService.createComment(body)
        if(!result) {

        } else {
            res.status(200).send('Ok')
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
        const result = await this.commentService.removeCommentById(commentId)

        if(!result) {

        } else {
            res.status(200).send("ok")
        }
    }


}
export default new CommentController()