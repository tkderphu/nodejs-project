import { NextFunction, Request, Response } from "express";
import { getUserLoggined } from "../framework/common/auth";
import { PostPageUserBookMarkRequest, PostUpdateLike, PostUpdateReq } from "../model/post";
import NotificationService from "../service/NotificationService";
import PostService from "../service/PostService";


class PostController {

    createPost(req: any, res: Response, next: NextFunction) {
        const body: PostUpdateReq = req.body;
        PostService.save(getUserLoggined(req).userId, body).then(result => {
            res.status(200).send(true)

        }).catch(err => next(err))
    }

    getListPostByFollowed(req: any, res: any, next: any) {
        
    }

    getListPost(req: any, res: Response, next: NextFunction) {
        const page = Number.parseInt(req.query.page) || 1
        const limit = Number.parseInt(req.query.limit) || 10
        const type = req.query.type
        if(type === "NORMAL") {
            PostService.findAll(page, limit).then(resp => {
                res.status(200).send(resp)
            }).catch(err => {
                next(err)
            })
        } else if(type === "FOLLOWED") {
            const userId = req.query.userId
            PostService.findAllByFollowed(userId, page, limit).then(resp => {
                res.status(200).send(resp)
            }).catch(err => next(err))
        } else if(type === "BOOKMARK") {
            const bookmarkType = req.query.bookmarkType
            const userId = req.query.userId
            PostService.findAllByMyBookmark(userId, bookmarkType, page, limit, -1).then(resp => {
                res.status(200).send(resp)
            }).catch(err => next(err))
        }
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