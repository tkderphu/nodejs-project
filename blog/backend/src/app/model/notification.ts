import { ObjectId } from "mongodb";

export interface NotifyMessage {
    _id?: ObjectId,
    createdAt: Date,
    notifyType: "COMMENT" | "POST" | "FOLLOW" | "REPLY_COMMENT",
    params: any,
    userMessages: {
        userId: string,
        read: boolean
    }[]
}

export interface NotifyComment {
    commentId?: string
    user?: { fullName: string, avatar: string },
    post?: { title: string, _id: string }
}
export interface NotifyNewPost {
    author?: {avatar?: string, fullName?: string}, 
    post?: {title?: string, _id?: string}
}
export interface NotifyFollow {
    user: {
        avatar?: string,
        fullname?: string,
        _id?: string
    }
}

export interface FirebaseMessageToken {
    token: string,
    userId: string,
}

//backend using redis => publish to who created post
//frontend subscribe all following for receive message