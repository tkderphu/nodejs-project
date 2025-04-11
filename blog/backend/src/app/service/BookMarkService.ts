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
        const result = await BookMarkRepository.deleteOne({
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
            type: objType
        }).toArray()

        if(result) {
            if(objType == 'POST') {
                return result.map((bookmark) => {
                    return {
                        userId: userId,
                        post: PostService.getPostDetail(bookmark.objId),
                        objType: objType 
                    }
                })
            } else {
                return result.map((bookmark) => {
                    return {
                        userId: userId,
                        series: "",
                        objType: objType 
                    }
                })
            }
        }
        return []
    }


}
export default new BookMarkService()
