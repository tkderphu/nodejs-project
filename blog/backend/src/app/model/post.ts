import { ObjectId } from "mongodb"
import { PageParam } from "../framework/common/page"
import { UserResponseSimple } from "./user"


export interface PostResponseSimple {
    id: string
    user: UserResponseSimple,
    title: string
    taggingId: string[],
    view: number
    like: number
    comment: number,
    createdDate: any,
    modifiedDate: any
}

export interface PostResponseDetail extends PostResponseSimple{
    content: string
}


export class PostCreateRequest {
    title: string = ''
    content: string = ''
    taggingIds: string[] = []
    view: number = 0
    userPostId: string = ''
    createdDate: any = new Date()
    modifiedDate: any = new Date()
}

export class PostUpdateRequest {
    title: string = ''
    content: string = ''
    taggingIds: string[] = []
    modifiedDate: any = new Date()
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