import { ObjectId } from "mongodb"

export interface Comment {
    userId: string
    content: string
    postId: string
    replyCommentId: string
}
export interface CommentDocument extends Comment {
    _id: ObjectId
}