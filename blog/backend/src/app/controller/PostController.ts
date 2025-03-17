import { NextFunction, Request, Response } from "express";
import { getUserLoggined } from "../framework/common/auth";
import { BookMarkReq } from "../model/bookmark";
import { PostCreateRequest, PostPageUserBookMarkRequest, PostUpdateLike } from "../model/post";
import PostService from "../service/PostService";


class PostController {

    createPost(req: any, res: Response, next: NextFunction) {
        const body: PostCreateRequest = req.body;
        body.userPostId = getUserLoggined(req).userId
        PostService.save(body).then(result => {
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

    getAllPostByUserBookMark(req: any, res: Response, next: NextFunction) {
        const request: PostPageUserBookMarkRequest = req.query
        PostService.findAllByUserBookMark(request).then(resp => {
            res.status(200).send(resp)
        }).catch(err => next(err))
    }
  
    updatelikePost(req: any, res: Response, next: NextFunction) {
        const body: PostUpdateLike = req.body
        PostService.updatelikePost(body.postId, body.userLikeId, (body.up ? 1 : -1)).then(result => {
            res.send(200);
        }).catch((err: any) => next(err))
    }



    deletePost(req: any, res: Response, next: NextFunction) {
        const postId = req.params["postId"];
        PostService.deletePost(postId, getUserLoggined(req).userId)
        .then(() => {
            res.send(200)
        }).catch(err => {
            next(err)
        })
    }


    
}

export default new PostController()