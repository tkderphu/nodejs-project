import { ObjectId } from "mongodb"
import { Tag } from "swagger-jsdoc"
import { UserSimple } from "./user"

export interface FollowBase {
    user: UserSimple,
    followObject: UserSimple | Tag
    type: 'TAG' | 'USER'
}

export interface Follow extends FollowBase {
    _id?: ObjectId
}