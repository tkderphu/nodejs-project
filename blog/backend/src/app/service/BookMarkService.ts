import { ObjectId } from "mongodb";
import { POST_DOCUMENT, USER_DOCUMENT } from "../../db/document";
import { BookMarkRepository } from "../../db/mongo";
import { BookMark, BookMarkReq } from "../model/bookmark";
import PostService from "./PostService";

class BookMarkService {

    /**
     * create bookmark
     * @param bookMarkReq : info for create bookmark
     * @returns promise<...>
     */
    async save(bookMarkReq: BookMarkReq) {
        if(bookMarkReq.entityType === 'POST') {
            const {userPostId}: any = (await PostService.findById(bookMarkReq.entityId))
            if(userPostId === bookMarkReq.userId) {
                throw new Error("can't bookmark yourself")
            }
        } else {

        }
        return BookMarkRepository.insertOne({
            ...bookMarkReq
        })
    }

    /**
     * count how many bookmark for post or series
     * @param by: POST or SERIES
     * @param id: postId or seriesId
     * @returns     
     */
    countBy(by: "POST" | "SERIES", id: string) {
        return BookMarkRepository.countDocuments({
            entityType: by,
            entityId: id
        })
    }

    /**
     * count how many time bookmark of user for post or series
     * @param by : "POST" | "SERIES"
     * @param userId : userId
     * @returns 
     */
    countByUser(by: "POST" | "SERIES", userId: string) {
        return BookMarkRepository.countDocuments({
            userId: userId,
            entityType: by
        })
    }

    /**
     * remove bookmark
     * @param bookmarkId 
     * @returns 
     */
    remove(bookmarkId: string) {
        return BookMarkRepository.deleteOne({
            _id: new ObjectId(bookmarkId)
        })
    }


    async findBookmarkByUser(type: string, userId: string) {
        const from = (type === 'POST') ? POST_DOCUMENT : ""
        console.log(userId)
        const reuslt = await BookMarkRepository.aggregate([
            {
                $match: {
                  userId: {
                    $eq:  userId
                  }
                }
            },
            {
                $addFields: { entityId: { $toObjectId: "$entityId" } } // Convert entityId to ObjectId
            },
            {
                $lookup: {
                  from: from,
                  localField: "entityId",
                  foreignField: "_id",
                  as: "results"
                }
            },
            {
                $unwind: "$results"
            },
            {
                $project: {
                    results: 1
                }
            },
            {
                $lookup: {
                    from: USER_DOCUMENT,
                    localField: "results.userPostId",
                    foreignField: "_id",
                    as: "results"
                  }
            }
        ]).toArray()


        const ans : {id: string, post?: any, series?: any}[] = reuslt.map(re => {
            return {
                id: re._id.toString(),
                post: (type === 'POST') ? re.results : undefined,
                series: !(type === 'POST') ? re.results : undefined
            }
        }) 
        return ans

    }

}
export default new BookMarkService()
