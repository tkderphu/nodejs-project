import { ObjectId } from "mongodb"
import db from "../../../db/mongo"
import { Comment } from "../model/comment"

class CommentRepository {
    private commentCollection = db.collection('comment')

    save(comment: Comment) {
        return this.commentCollection.insertOne({
            ...comment
        })
    }
    findAllByPostId(postId: string) {
        return this.commentCollection.find({
            postId: postId
        })
    }
    deleteById(commentId: string) {
        return this.commentCollection.deleteOne({
            _id: new ObjectId(commentId)
        })
    }

    
}
export default new CommentRepository()