import { ObjectId } from "mongodb";

export interface Report {
    _id?: ObjectId
    type: "COMMENT" | "POST",
    typeId: string
    reason: string
    userId: string,
    createdAt: any,
    status: "PENDING" | "RESOLVED"
}