import { NextFunction, Request, Response } from "express";
import { getUserLoggined } from "../framework/common/auth";
import { PostPageUserBookMarkRequest, PostUpdateLike, PostUpdateReq } from "../model/post";
import PostService from "../service/PostService";


class PostController {

    createPost(req: any, res: Response, next: NextFunction) {
        const body: PostUpdateReq = req.body;
        PostService.save(getUserLoggined(req).userId, body).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))
    }



    getListPost(req: any, res: Response, next: NextFunction) {
        const page = Number.parseInt(req.query.page) || 1
        const limit = Number.parseInt(req.query.limit) || 10
        const { taggingNames, timeStamps, keyword, userId } = req.body
        console.log("limit: ", limit)
        console.log("request: ", req.body)
        //@ts-ignore
        PostService.findAll({
            keyword: keyword,
            taggingNames: taggingNames,
            timestamp: timeStamps,
            userId: userId
        }, page, limit).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }

    getPostDetail(req: any, res: any, next: any) {
        const {id} = req.params
        PostService.getPostDetail(id).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            next(err)
        })
    }

    updatePost(req: any, res: Response, next: NextFunction) {
        const postId = req.params['postId']
        const body = req.body
        PostService.update(postId, body).then(result => {
            res.status(200).send(result)
        }).catch(err => {
            next(err)
        })
    }
}

export default new PostController()