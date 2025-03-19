import { ObjectId } from "mongodb"
import { PostSimpleResp } from "./post"
import { Series, SeriesSimpleResp } from "./series"
import { UserSimple } from "./user"



export interface BookMark extends BookMarkBase{
   _id?: ObjectId
}


export interface BookMarkBase {
    type?: "POSTS" | "SERIES",
    object?: PostSimpleResp | SeriesSimpleResp,
    user?: string,
    createdAt: Date
}


export interface BookMarkReq {
    type: "POSTS" | "SERIES",
    objectId: string
}

