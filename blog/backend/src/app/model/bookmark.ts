import { ObjectId } from "mongodb";


export interface BookMark {
    id: string
    postId: string
    userId: string
}

export interface BookMarkReq {
    postId: string
    userId: string
}