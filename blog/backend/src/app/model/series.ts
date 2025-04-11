import { ObjectId } from "mongodb";
import { Tagging } from "./tagging";

export interface Series {
    _id?: ObjectId,
    title?: string,
    content?: string,
    tags:   Tagging[],
    userId: string,
    displayUrl?: string
    description?: string
    timestamps: {
        createdAt: any,
        updatedAt: any
    }
}

