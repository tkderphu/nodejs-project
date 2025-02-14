export interface Post {
    _id: string ;  
    content?: string
    thumbnail?: string
    taggingId?: string
    numShareToSocial?: number
    userPostId?: string
    disabledComment?: boolean
    createdDate?: any
    modifiedDate?: any
}