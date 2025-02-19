import { PageParam } from "../../common/common"

export interface Post {
    _id?: string
    content?: string
    thumbnail?: string
    taggingId?: string
    numShareToSocial?: number
    userPostId?: string
    disabledComment?: boolean
    createdDate?: any
    modifiedDate?: any,
    view?: number,
    like?: number
}

export interface PostResponse extends Post {
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

export interface PostUpdateLike {
    postId: string
    userLikeId: string
    up: boolean
}