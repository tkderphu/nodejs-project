import { BookMarkRepository } from "../../db/mongo";
import { Bookmark } from "../model/bookmark";
import PostService from "./PostService";

class BookMarkService {

 
    async save(userId: string, objId: string, objType: string) {
        let bookMark: Bookmark = {
            userId: userId,
            objId: objId,
            objType: objType
        }
        return BookMarkRepository.insertOne(bookMark)
    }

    async remove(userId: string, objId: string, objType: string) {
        const result = await BookMarkRepository.deleteMany({
            userId: userId,
            objId: objId,
            objType: objType
        })
        if(result.acknowledged) {
            return true
        }
        throw new Error("You can't remove this bookmark")
    }


    async countBookmark(objId: string, objType: "POST" | "SERIES") {
        const result = await BookMarkRepository.countDocuments({
            objId: objId,
            objType: objType
        })
        if(result) return result
        return 0;
    }


    async checkBookmarked(userId: string, objId: string, objType: string) {
        const result = await BookMarkRepository.findOne({
            userId: userId,
            objId: objId,
            objType: objType
        })

        if(result) {
            return true
        }
        return false
    }

    async getBookmarks(userId: string, objType: "POST" | "SERIES") {
         const result = await BookMarkRepository.find({
            userId: userId,
            objType: objType
        }).toArray()

        for(let i = 0; i < result.length; i++) {
            if(objType === "POST") {
                result[i].post = await PostService.getPostDetail(result[i].objId, userId)
            }
        }

        return result;
    }


}
export default new BookMarkService()
