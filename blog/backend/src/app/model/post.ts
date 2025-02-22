import { ObjectId } from "mongodb"
import { PageParam } from "../framework/common/page"

export interface Post {
    
    content?: string
    thumbnail?: string
    taggingIds?: string[]
    numShareToSocial?: number
    userPostId?: string
    disabledComment?: boolean
    createdDate?: any
    modifiedDate?: any,
    view?: number,
    like?: number
}

export interface PostDocument extends Post {
    _id: ObjectId
}

export interface PostResponse extends Post {
    _id: string
    userFullName?: string,
    userAvatar?: string
}

export interface PostPageRequest extends PageParam {
    keyword?: string
    taggingId?: string
    userPostId?: string
    startDate?: any
    endDate?: any,
    sort?: any
}

interface Sort {

}

export interface PostUpdateLike {
    postId: string
    userLikeId: string
    up: boolean
}