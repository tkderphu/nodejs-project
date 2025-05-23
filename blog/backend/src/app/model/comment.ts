import { ObjectId } from "mongodb"
import { PageParam } from "../framework/common/page"
import { UserSimple } from "./user"

export interface Comment{
    _id?: ObjectId,
    userId?: string
    content?: string
    postId?: string
    rootCommentId?: string
    createdDate: Date,
    imageUrls?: string[],
    replyCommentId?: string
    like?: number
}

export interface CommentReqVO {
    content?: string
    postId: string
    rootCommentId?: string,
    replyCommentId?: string
    imageUrls?: string[]
}

