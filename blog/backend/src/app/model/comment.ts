import { ObjectId } from "mongodb"
import { PageParam } from "../framework/common/page"
import { UserSimple } from "./user"

export interface Comment extends CommentBase{
    _id?: ObjectId
}

export interface CommentBase {
    user?: UserSimple
    content?: string
    postId?: string
    nestedComments?: Comment[]
    createdDate: Date,
    fileUrls?: string[]
}

export interface CommentReqVO {
    content?: string
    postId?: string
    replyCommentId?: string
}

export interface CommentPageReqVO extends PageParam {
    postId: string
}

