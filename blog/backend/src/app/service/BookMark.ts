import { ObjectId } from "mongodb";
import { BookMarkRepository } from "../../db/mongo";
import { BookMark, BookMarkReq } from "../model/bookmark";

class BookMarkService {

    save(bookMarkReq: BookMarkReq) {
        return BookMarkRepository.insertOne({
            ...bookMarkReq
        })
    }

    countByPost(postId: string) {
        return BookMarkRepository.countDocuments({
            postId: postId
        })
    }

    countByUser(userId: string) {
        return BookMarkRepository.countDocuments({
            userId: userId
        })
    }

    removePostBookMark(bookmarkId: string) {
        return BookMarkRepository.deleteOne({
            _id: new ObjectId(bookmarkId)
        })
    }

}
export default new BookMarkService()
