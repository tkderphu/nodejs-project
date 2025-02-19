import { Comment } from "../dataobject/model/comment"
import commentRepository from "../dataobject/repository/comment.repository"

class CommentService {
    private commentRepo = commentRepository
    createComment(req: any) {
        const comment: Comment = {...req}
        return this.commentRepo.save(comment)
    }
    getAllCommentByPostId(postId: string) {
        return this.commentRepo.findAllByPostId(postId)
    }
    removeCommentById(commentId: string) {
        return this.commentRepo.deleteById(commentId)
    }
    removeAllByPostId() {
        
    }
}
export default new CommentService()