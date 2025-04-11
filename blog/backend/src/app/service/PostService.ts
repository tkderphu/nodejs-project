import { Filter, ObjectId } from "mongodb"
import { Post, PostBase, PostPageRequest, PostPageUserBookMarkRequest, PostResponseDetail, PostUpdateReq } from "../model/post"
import CommentService from "./CommentService"
import LikeService from "./LikeService"
import { BookMarkRepository, PostRepository } from "../../db/mongo"
import AccessDeniedException from "../exception/AccessDeniedException"
import { PageResult } from "../framework/common/page"
import { POST_DOCUMENT, USER_DOCUMENT } from "../../db/document"
import TaggingService from "./TaggingService"
import PostNotFoundException from "../exception/PostNotFoundException"
import UserService from "./UserService"
import BookMarkService from "./BookMarkService"
import NotificationService from "./NotificationService"
class PostService {


    async save(userId: string, postReq: PostUpdateReq) {
        const userSimple: any = await UserService.findById(userId)
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
            taggings: (await TaggingService.save(postReq.taggingNames))
        }
        const resp = await PostRepository.insertOne(post)
        //notification 
        //@ts-ignore
        NotificationService.sendNotify(resp.insertedId.toString(),post.title, 
            userSimple?._id.toString(), userSimple.fullName, post.timestamps.createdAt)
        return 
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

    async getPostDetail(postId: string)  {
        const post: any  = await this.findById(postId)
        post.user = await UserService.findById(post.userId)
        post.bookmark = await BookMarkService.countBookmark(post._id.toString(), 'POST')
        return post
    }

    async findById(postId: string) {
        const result = await  PostRepository.findOne({
            _id: new ObjectId(postId)
        })
        if(result) return result

        throw new PostNotFoundException("post not found")
    }


    countPostIsCreatedByUserId(userId: string) {
        return PostRepository.countDocuments({
            userPostId: userId
        })
    }

    async findAll(req: {taggingNames?: string[], timestamp?: {startDate: any, endDate: any}, userId?: string, keyword?: string},
        page: number, limit: number) {
        let filter: any = {}
        if (req.taggingNames) {
            filter = {
                ...filter,
                "taggings.name": {
                    $in: req.taggingNames
                }
            }
        }
        if (req.timestamp) {
            filter.timestamps = {
                "createdDate.$gte": new Date(req.timestamp.startDate)
            }
            filter.timestamps =  {
                "createdDate.$lte": new Date(req.timestamp.endDate)
            }
        }
        if (req.userId) {
            filter.userId = req.userId
        }
        if (req.keyword) {
            filter.$text.$search = req.keyword
        }

        const countDocuments = await PostRepository.countDocuments(filter)

        const totalPage = Math.ceil(countDocuments / limit)
        const skip = (page - 1) * limit

        let result = PostRepository
            .find(filter)
            .skip(skip)
            .sort({'timestamps.createdAt': -1})
            .limit(limit)

        let posts: any = (await result.toArray())

        for(let i = 0; i < posts?.length; i++) {
            posts[i].user = await UserService.findById(posts[i].userId)
            posts[i].bookmark = await BookMarkService.countBookmark(posts[i]._id.toString(), 'POST')
        }

        
        const pageResult: PageResult<Post> = {
            currentPage: page,
            list: posts,
            totalPage: totalPage
        }

        return pageResult
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

}

export default new PostService()