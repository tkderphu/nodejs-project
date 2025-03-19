import { Filter, ObjectId } from "mongodb"
import { Post, PostBase, PostPageRequest, PostPageUserBookMarkRequest, PostUpdateReq } from "../model/post"
import CommentService from "./CommentService"
import LikeService from "./LikeService"
import { BookMarkRepository, PostRepository } from "../../db/mongo"
import AccessDeniedException from "../exception/AccessDeniedException"
import { PageResult } from "../framework/common/page"
import { POST_DOCUMENT, USER_DOCUMENT } from "../../db/document"
import TaggingService from "./TaggingService"
import PostNotFoundException from "../exception/PostNotFoundException"
class PostService {


    async save(userId: string, postReq: PostUpdateReq) {
        
        const post: PostBase  = {
            comment: 0,
            like: 0,
            view: 0,
            timestamps: {
                createdAt: new Date(),
                updatedAt: new Date()
            },
            userId: userId,
            content: postReq.content,
            description: postReq.description,
            displayUrl: postReq.displayUrl,
            title: postReq.title,
            taggings: (await TaggingService.save(postReq.taggingIds))
        }

        return PostRepository.insertOne(post)
    }

    update(postId: string, post: PostUpdateReq) {
        return PostRepository.updateOne({
            _id: new ObjectId(postId)
        }, {
            $set: {
                ...post
            }
        })
    }

    async findById(postId: string) {
        const result = await  PostRepository.findOne({
            _id: new ObjectId(postId)
        })
        if(result) return result

        throw new PostNotFoundException("post not found")
    }


    async findAllByUserBookMark(postPageReq: PostPageUserBookMarkRequest) {
        const posts = await BookMarkRepository.aggregate([
            {
                $match: {
                    "userId": {
                        $eq: postPageReq.userId
                    }
                }
            },
            {
                $lookup: {
                    from: POST_DOCUMENT,
                    localField: "postId",
                    foreignField: "_id",
                    as: "posts"
                }
            },
            {
                $unwind: "$posts"
            },
            {
                $projection: {
                    _id: 0,
                    posts: 1
                }
            },
            {
                $lookup: {
                    from: USER_DOCUMENT,
                    localField: "userPostId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            }
        ]).toArray()

        return posts
        // const arr = posts.map(post => {
        //     const postSimple: PostResponseSimple = {
        //         ...post,
        //         id: post.
        //     }
        // })

    }

    async findAllByCondition(req: PostPageRequest) {
        // const filter: any = {}
        // if (req.taggingId) {
        //     filter.taggingId = req.taggingId
        // }
        // if (req.startDate && req.endDate) {
        //     filter.createdDate.$gte = new Date(req.startDate)
        //     filter.createdDate.$lte = new Date(req.endDate)
        // }
        // if (req.userPostId) {
        //     filter.userPostId = req.userPostId
        // }
        // if (req.keyword) {
        //     filter.$text.$search = req.keyword
        // }

        // const countDocuments = await PostRepository.countDocuments(filter)

        // const totalPage = Math.ceil(countDocuments / req.limit)
        // const skip = (req.page - 1) * req.limit

        // let result = PostRepository
        //     .find(filter)
        //     .skip(skip)
        //     .limit(req.limit)
        // if (req.sort) {
        //     result = result.sort(req.sort)
        // }

        // let list: any = (await result.toArray())


        // const pageResult: PageResult<PostResponse> = {
        //     currentPage: req.page,
        //     list: list,
        //     totalPage: totalPage
        // }

        // return pageResult

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
        let post = ((await this.findById(postId)) as Post)
        if (post) {
            if (post.userId !== userId) {
                throw new AccessDeniedException("You can't perform this action")
            }
            LikeService.deleteAllLikePost(postId, userId)
            CommentService.removeAllByPostId(postId)
        }
    }




}

export default new PostService()