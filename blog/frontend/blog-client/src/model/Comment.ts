import {Author} from './User'
export interface Comment{
    _id: string
    user: Author
    content?: string
    rootCommentId?: string
    createdDate: any,
    imageUrls?: string[],
    replyComment?: Comment
    nestedComments: Comment[]
    like?: number
}

export interface CommentReqVO {
    content?: string
    postId?: string
    rootCommentId?: string,
    replyCommentId?: string
    imageUrls?: string[]
}

