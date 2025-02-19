import { Filter, ObjectId } from "mongodb"
import db from "../../db/mongo"
import { PageResult } from "../common/common"
import { PostPageRequest, PostResponse } from "../dataobject/model/post"
import CommentService from "./CommentService"
import LikeService from "./LikeService"

class PostService {
    private postCollection = db.collection("post")

    save(post: any) {
        return this.postCollection.insertOne({
            ...post
        })
    }
    findById(postId: string) {
        return this.postCollection.findOne({
            _id: new ObjectId(postId)
        })
    }

    async findAllByCondition(req: PostPageRequest) {
        const filter : any = {}
        if(req.taggingId) {
            filter.taggingId = req.taggingId
        }
        if(req.startDate && req.endDate) {
            filter.createdDate.$gte = new Date(req.startDate)
            filter.createdDate.$lte = new Date(req.endDate)
        }
        if(req.userPostId) {
            filter.userPostId = req.userPostId
        }
        if(req.keyword) {
            filter.$text.$search = req.keyword 
        }

        const countDocuments = await this.postCollection.countDocuments(filter)

        const totalPage = Math.ceil(countDocuments/req.limit)
        const skip = (req.page - 1) * req.limit

        let result = this.postCollection
                            .find(filter)
                            .skip(skip)
                            .limit(req.limit)
        if(req.sort) {
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
        return this.postCollection.countDocuments({
            userPostId: userId
        })
    }


    updatelikePost(postId: string, userLikeId: string, up: number) {
        if(up > 0) {
            LikeService.createLike({
                userLikeId: userLikeId,
                postId: postId
            })
        } else {
            LikeService.deletelikePost(postId, userLikeId)
        }
        return this.postCollection.updateOne({
            _id: new ObjectId(postId)
        }, {
            $inc: {
                like: up
            }
        })
    }

     deletePost(postId: string) {
         
    }


    

}

export default new PostService()