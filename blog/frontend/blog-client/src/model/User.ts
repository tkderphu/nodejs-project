export interface Author {
    _id?: string
    fullName?: string,
    image_url?: string,
    followers?: number
    numberPosts?: number,
    view?: number
}
export interface UserProfile {
    _id: string,
    followTags?: number,
    followings?: number,
    followers?: number,
    posts?: number,
    bookmark?: number,
    comments?: number,
    fullName?: string
    image_url?: string
    bio?: string
    role?: 'ADMIN' | 'USER'
}
