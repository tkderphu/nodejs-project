import { ObjectId } from "mongodb";

export interface Gallery {
    _id?: ObjectId,
    userId?: string
    imageUrl?: string,
    imagePublicId?: string
}