import { ObjectId } from "mongodb"
import { CommentRepository } from "../../db/mongo"
import { startFrom } from "../framework/common/page"
import { Comment, CommentPageReqVO } from "../model/comment"
import LikeService from "./LikeService"

class CommentService {

    createComment(req: any) {
        const comment: Comment = {...req}
        return CommentRepository.insertOne(comment)
    }
    async getPageCommentByPostId(commentPageReq: CommentPageReqVO) {
        
        const arr = await CommentRepository.find({
            postId: commentPageReq.postId
        }).skip(startFrom(commentPageReq))
          .limit(commentPageReq.limit)
          .sort({createdDate: -1}).toArray()
        
        return arr || new Array()
    }
    async removeCommentById(commentId: string, userId: string) {
        await LikeService.deleteLikeComment(commentId, userId)
        await CommentRepository.deleteOne({
            _id: new ObjectId(commentId)
        })
        return true;
    }
    async removeAllByPostId(postId: string) {
        return CommentRepository.deleteMany({
            postId: postId
        })
    }

    async countByPost(postId: string) {
        return CommentRepository.countDocuments({
            postId: postId
        })
    }
}
export default new CommentService()