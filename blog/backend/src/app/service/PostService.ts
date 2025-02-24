import { Filter, ObjectId } from "mongodb"
import { PostDocument, PostPageRequest, PostPageUserBookMarkRequest, PostResponse } from "../model/post"
import CommentService from "./CommentService"
import LikeService from "./LikeService"
import { PostRepository } from "../../db/mongo"
import AccessDeniedException from "../exception/AccessDeniedException"
import { PageResult } from "../framework/common/page"
class PostService {


    save(post: any) {
        return PostRepository.insertOne({
            ...post
        })
    }

    update(id: string, post: any) {
        return PostRepository.updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                ...post
            }
        })
    }

    findById(postId: string) {
        return PostRepository.findOne({
            _id: new ObjectId(postId)
        })
    }


    async findAllByUserBookMark(postPageReq: PostPageUserBookMarkRequest) {
        
    }

    async findAllByCondition(req: PostPageRequest) {
        const filter: any = {}
        if (req.taggingId) {
            filter.taggingId = req.taggingId
        }
        if (req.startDate && req.endDate) {
            filter.createdDate.$gte = new Date(req.startDate)
            filter.createdDate.$lte = new Date(req.endDate)
        }
        if (req.userPostId) {
            filter.userPostId = req.userPostId
        }
        if (req.keyword) {
            filter.$text.$search = req.keyword
        }

        const countDocuments = await PostRepository.countDocuments(filter)

        const totalPage = Math.ceil(countDocuments / req.limit)
        const skip = (req.page - 1) * req.limit

        let result = PostRepository
            .find(filter)
            .skip(skip)
            .limit(req.limit)
        if (req.sort) {
            result = result.sort(req.sort)
        }

        let list: any = (await result.toArray())


        const pageResult: PageResult<PostResponse> = {
            currentPage: req.page,
            list: list,
            totalPage: totalPage
        }

        return pageResult

    }

    countPostIsCreatedByUserId(userId: string) {
        return PostRepository.countDocuments({
            userPostId: userId
        })
    }


    updatelikePost(postId: string, userLikeId: string, up: number) {
        if (up > 0) {
            LikeService.createLike({
                userLikeId: userLikeId,
                postId: postId
            })
        } else {
            LikeService.deletelikePost(postId, userLikeId)
        }
        return PostRepository.updateOne({
            _id: new ObjectId(postId)
        }, {
            $inc: {
                like: up
            }
        })
    }

    async deletePost(postId: string, userId: string) {
        let post = ((await this.findById(postId)) as PostDocument)
        if (post) {
            if (post.userPostId !== userId) {
                throw new AccessDeniedException("You can't perform this action")
            }
            LikeService.deleteAllLikePost(postId, userId)
            CommentService.removeAllByPostId(postId)
        }
    }




}

export default new PostService()