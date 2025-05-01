import { UserProfile } from "./User"

export interface Series {
    _id?: string,
    title?: string,
    content?: string,
    tags:   {
        _id: string,
        name: string
    }[],
    user: UserProfile
    displayUrl?: string
    description?: string
    timestamps: {
        createdAt: any,
        updatedAt: any
    },
    like: number,
    bookmark: number,
    comment: number,
    view: number
}
