import { ObjectId } from "mongodb"
import { CommentRepository } from "../../db/mongo"
import { Comment } from "../model/comment"

class CommentService {

    
    
    createComment(req: any) {
        const comment: Comment = {...req}
        return CommentRepository.insertOne(comment)
    }
    getAllCommentByPostId(postId: string) {
        return CommentRepository.find({
            postId: postId
        }).toArray()
    }
    removeCommentById(commentId: string) {
        return CommentRepository.deleteOne({
            _id: new ObjectId(commentId)
        })
    }
    removeAllByPostId() {
        
    }
}
export default new CommentService()