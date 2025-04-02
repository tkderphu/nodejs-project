import { ObjectId } from "mongodb"
import { Tagging } from "./tagging"
import { UserSimple } from "./user"

export interface FollowBase {
    user: UserSimple,
    followObject: UserSimple | Tagging
    type: 'TAG' | 'USER'
}

export interface Follow extends FollowBase {
    _id?: ObjectId
}