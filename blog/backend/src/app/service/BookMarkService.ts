import { ObjectId } from "mongodb";
import { POST_DOCUMENT, USER_DOCUMENT } from "../../db/document";
import { BookMarkRepository } from "../../db/mongo";
import { BookMark, BookMarkReq } from "../model/bookmark";
import PostService from "./PostService";

class BookMarkService {

 
    async save(userId: string, bookMarkReq: BookMarkReq) {
        let bookMark: BookMark = {
            type: bookMarkReq.type,
            user: userId,
            createdAt: new Date()
        }

        if(bookMarkReq.type === 'POSTS') {
            //post
        } else {
            //find series
        }

        return BookMarkRepository.insertOne({
            ...bookMark
        })
    }

    /**
     * remove bookmark
     * @param bookmarkId 
     * @returns 
     */
    async remove(userId: string, bookmarkId: string) {
        const result = await BookMarkRepository.deleteOne({
            _id: new ObjectId(bookmarkId),
            userId: userId
        })
        if(result.acknowledged) {
            return true
        }
        throw new Error("You can't remove this bookmark")
    }


    async findBookmark(userId: string, type: "POSTS" | "SERIES", sortBy: "Published date" | "Bookmarked at" = 'Published date') {
        let sort  = {}
        if(sortBy === 'Published date') {
            //@ts-ignore
            sort.timestamps.createdAt =  -1
        } else {
            //@ts-ignore
            sort.createdAt =  -1
        }
        return BookMarkRepository.find({
            userId: userId,
            type: type
        }).sort(sort).toArray()
    }


    async isObjectBookmarked(userId: string, type: "POSTS" | "SERIES", objectId: string) {
        const result = await BookMarkRepository.findOne({
            userId: userId,
            type: type
        })

        if(result) {
            return true
        }
        return false
    }


}
export default new BookMarkService()
