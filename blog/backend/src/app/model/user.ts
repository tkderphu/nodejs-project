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
    lastVisit?: any,
    followedTags?: Tagging[],
    followedAuthors?: UserSimple[],
    followers?: UserSimple[],
    role?: 'ADMIN' | 'USER'
}



export interface UserResponse extends UserBase {
    _id: string
}