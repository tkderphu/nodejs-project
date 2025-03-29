export interface Post {
    _id?: string
    content?: string
    description?: string
    displayUrl?: string
    timestamps?: {
        createdAt: any,
        updatedAt: any
    },
    taggings?: {
        _id?: string,
        name?: string
    }[],
    title?: string
    comment?: number
    like?: number,
    view?: number,
    bookmark?: number,
    user?: {
        _id?: string
        fullName?: string,
        image_url?: string
    }

}