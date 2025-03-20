import { ObjectId } from "mongodb"
import { CommentRepository } from "../../db/mongo"
import { startFrom } from "../framework/common/page"
import { Comment, CommentPageReqVO, CommentReqVO } from "../model/comment"
import LikeService from "./LikeService"
import UserService from "./UserService"

class CommentService {

    async createComment(userId: string, commentReq: CommentReqVO) {
        const user = await UserService.findById(userId)
        
        const comment: Comment = {
            createdDate: new Date(),
            fileUrls: [],
            postId: commentReq.postId,
            content: commentReq.content,
            user: {
                ...user
            }
        }

        const resultInsert = await CommentRepository.insertOne(comment)
        
        let parentComment = (await CommentRepository.findOne({
            _id: new ObjectId(commentReq.replyCommentId)
        })) as Comment

        const result: Comment = {
            ...comment,
            _id: resultInsert.insertedId
        }

        if(parentComment) {
            parentComment.nestedComments?.push(result)
            CommentRepository.insertOne(parentComment)
        }
        
        return result
    }


    async getPageCommentByPostId(postId: string, page: number = 1, limit: number = 10) {
        const arr = await CommentRepository.find({
            postId: postId
        }).skip(startFrom(page, limit))
          .limit(limit)
          .sort({createdDate: -1}).toArray()
        
        return arr || new Array()
    }
    
    async removeCommentById(commentId: string, userId: string) {
        await CommentRepository.deleteOne({
            _id: new ObjectId(commentId),
            "user._id": new ObjectId(userId)
        })
        return true;
    }
   
    async countByPost(postId: string) {
        return CommentRepository.countDocuments({
            postId: postId
        })
    }
}
export default new CommentService()