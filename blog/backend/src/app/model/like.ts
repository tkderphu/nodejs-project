export interface Like {
    userId: string
    postId?: string
    commentId?: string
}

export interface LikeDocument extends Like {
    _id: string
}
