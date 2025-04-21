import { ObjectId } from "mongodb"
import { Tagging } from "./tagging"

export interface User extends UserBase{
    _id?: ObjectId
    email?: string
    password?: string
}

export interface UserSimple {
    _id?: ObjectId,
    fullName?: string
    image_url?: string
}

export interface UserBase {
    fullName?: string
    email?: string
    password?: string
    image_url?: string
    bio?: string
    role?: 'ADMIN' | 'USER',
    socialNetworkPlatform?: {
        instagram?: string
        twitter?: string
        linkedln?: string,
        github?: string,
        yoursite?: string
    },
    nickname?: string
}



export interface UserProfile extends UserBase {
    _id: ObjectId,
    followTags?: number,
    followings?: number,
    followers?: number,
    posts?: number,
    bookmark?: number,
    comments?: number
}
