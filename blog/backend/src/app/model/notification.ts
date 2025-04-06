import { ObjectId } from "mongodb";

export interface NotifyMessage {
    content?: string,
    _id?: ObjectId,
    createdAt: Date,
    userMessages: {
        userId: string,
        read: boolean
    }[]
}


export interface FirebaseMessageToken {
    token: string,
    userId: string,
}

//backend using redis => publish to who created post
//frontend subscribe all following for receive message