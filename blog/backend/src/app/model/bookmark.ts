import { ObjectId } from "mongodb"
import { PostSimpleResp } from "./post"
import { Series, SeriesSimpleResp } from "./series"
import { UserSimple } from "./user"


export interface Bookmark {
    _id?: ObjectId,
    userId: string
    objId: string
    objType: string
}
