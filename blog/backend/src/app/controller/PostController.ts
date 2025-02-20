import { NextFunction, Request, Response } from "express";
import { PostUpdateLike } from "../model/post";
import PostService from "../service/PostService";


class PostController {

    createPost(req: Request, res: Response, next: NextFunction) {
        const body = req.body;
        PostService.save(body).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))
    }


    getListPost(req: Request, res: Response, next: NextFunction) {
        const request = req.body
        PostService.findAllByCondition(request).then(result => {
            res.status(200).send(result)
        }).catch(err => next(err))
    }


    updatePost(req: Request, res: Response, next: NextFunction) {
        
    }

  
    updatelikePost(req: Request, res: Response, next: NextFunction) {
        const body: PostUpdateLike = req.body
        PostService.updatelikePost(body.postId, body.userLikeId, (body.up ? 1 : -1)).then(result => {
            res.send(200);
        }).catch(err => next(err))
    }



    deletePost(req: Request, res: Response, next: NextFunction) {
        const postId = req.params["postId"];
        PostService.deletePost(postId)
    }

    disabledComment(req: Request, res: Response, next: NextFunction) {

    }



    disabledPost(req: Request, res: Response, next: NextFunction) {

    }

    countPostWasCreatedByUserId(req: Request, res: Response, next: NextFunction) {
        
    }

    enableComment(req: Request, res: Response, next: NextFunction) {

    }

    enabledPost(req: Request, res: Response, next: NextFunction) {

    }
    
}

export default new PostController()