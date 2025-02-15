import { Request, Response } from "express";
import PostService from "../service/PostService";


class PostController {
    private postService = PostService

    async createPost(req: Request, res: Response) {
        const body = req.body;
        const result = await this.postService.createPost(body);
        if(!result) {
            res.status(400).send('Error')
        } else {
            
        }
    }

    getListPort(req: Request, res: Response) {

    }

    updatePost(req: Request, res: Response) {
        
    }

    getListPortByUserId(req: Request, res: Response) {

    }

    likePost(req: Request, res: Response) {

    }

    unlikePost(req: Request, res: Response) {
        const postId = req.params['postId']
    }

    deletePost(req: Request, res: Response) {

    }

    disabledComment(req: Request, res: Response) {

    }

    getListPostByTaggingId(req: Request, res: Response) {

    }
    
    searchPostByKeyword(req: Request, res: Response) {

    }


    disabledPost(req: Request, res: Response) {

    }

    countPostWasCreatedByUserId(req: Request, res: Response) {

    }
    enableComment(req: Request, res: Response) {

    }
    enabledPost(req: Request, res: Response) {

    }
    
}

export default new PostController()