import { ObjectId } from "mongodb"
import { Tag } from "swagger-jsdoc"
import { UserSimple } from "./user"

export interface Series extends SeriesSimpleResp{
    content?: string
}



export interface SeriesSuperSimpleResp {
    _id?: ObjectId,
    title?: string
}

export interface SeriesSimpleResp extends SeriesSuperSimpleResp{
    title?: string
    user?: UserSimple,
    timestamps: {
        createdAt: Date,
        updatedAt: Date
    },
    tags: Tag[]
}