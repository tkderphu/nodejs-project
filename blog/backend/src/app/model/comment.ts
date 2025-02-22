import { ObjectId } from "mongodb"
import { PageParam } from "../framework/common/page"

export interface Comment {
    userId: string
    content: string
    postId: string
    replyCommentId: string
    createdDate: any,
    fileUrls: string[]
}
export interface CommentDocument extends Comment {
    _id: ObjectId
}
export interface CommentReqVO {
    userId: string
    content: string
    postId: string
    replyCommentId?: string
}

export interface CommentRespVO extends Comment {
    id: string
}
export interface CommentPageReqVO extends PageParam {
    postId: string
}