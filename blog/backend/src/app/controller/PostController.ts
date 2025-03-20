import { NextFunction, Request, Response } from "express";
import { getUserLoggined } from "../framework/common/auth";
import { BookMarkReq } from "../model/bookmark";
import {PostPageUserBookMarkRequest, PostUpdateLike, PostUpdateReq } from "../model/post";
import PostService from "../service/PostService";


class PostController {

    createPost(req: any, res: Response, next: NextFunction) {
        const body: PostUpdateReq = req.body;
        PostService.save(getUserLoggined(req).userId, body).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))
    }

    

    getListPost(req: any, res: Response, next: NextFunction) {
        const any = req.body
        PostService.findAllByCondition(any).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))
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