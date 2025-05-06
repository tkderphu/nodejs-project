import { ObjectId } from "mongodb";

export interface Flower {
    _id: ObjectId,
    userId: string,
    numberFlower: number
}
export interface Transaction {
    _id?: ObjectId,
    numberFlower: number,
    userId?: string,
    message: string
    createdAt: any
}

export interface UnlockPost {
    _id: ObjectId,
    userId: string,
    postId: string
}
