import { ObjectId } from "mongodb"
import { PageParam } from "../framework/common/page"
import { Tagging } from "./tagging"
import {UserSimple } from "./user"

export interface Post extends PostBase{
    _id: ObjectId
}

export interface PostBase {
    userId?: string
    title?: string
    view: number
    like: number,
    comment: number,
    bookmark: number
    content?: string
    displayUrl?: string
    description?: string
    taggings: Tagging[]
    timestamps: {
        createdAt: Date,
        updatedAt: Date
    }
    seriesId?: string
}



export interface PostUpdateReq {
    title?: string
    description?: string
    content: string
    taggingNames: string[],
    displayUrl?: string
}


export interface PostSimpleResp {
    id?: ObjectId,
    description?: string
    title?: string,
    user: UserSimple,
    displayUrl?: string
    taggings: Tagging[],
    view: number,
    comment: number
    like: number,
    timestamps: {
        createdAt: Date,
        updatedAt: Date
    }
}

export interface PostResponseDetail extends PostSimpleResp{
    content?: string
}



export interface PostPageRequest extends PageParam {
    keyword?: string
    taggingId?: string
    userPostId?: string
    startDate?: any
    endDate?: any,
    sort?: any
}

export interface PostPageUserBookMarkRequest extends PageParam {
    userId: string
}


export interface PostUpdateLike {
    postId: string
    userLikeId: string
    up: boolean
}