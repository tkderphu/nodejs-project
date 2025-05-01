import { Request, Response } from "express";
import { PostRepository, UserRepository } from "../../db/mongo";
import { totalPage, PageResult, startFrom } from "../framework/common/page";
import UserService from "../service/UserService";

const searchPosts = async (q: string, sortBy: string, sortType: string, page: number, limit: number) => {
    const pipeline = [];

    // 1. Text Search Match
    if (q) {
        pipeline.push({
            $match: {
                $text: { $search: q }
            }
        });

        // 2. Add text score for sorting
        pipeline.push({
            $addFields: {
                score: { $meta: "textScore" }
            }
        });
    }

    // 3. Tag Filter


    // 4. Sorting
    let sortStage: any = {};
    if (q && sortBy === "relevance") {
        sortStage = { score: -1 }; // highest relevance first
    } else {
        const sortFieldMap = {
            view: "view",
            like: "like",
            bookmark: "bookmark",
            createdAt: "timestamps.createdAt",
            comment: "comment"
        };
        sortStage = {
            //@ts-ignore
            [sortFieldMap[sortBy] || "view"]  : (sortType === "asc" ? 1 : -1)
        }
    }

    pipeline.push({ $sort: sortStage });
    const posts = await PostRepository.aggregate(pipeline)
                                    .skip(startFrom(page, limit))    
                                    .toArray();
    const pageResult: PageResult<any> = {
        currentPage: page,
        list: posts,
        totalPage: totalPage(limit, posts),
        totalItem:  (await PostRepository.aggregate(pipeline).toArray()).length
    }
    return pageResult;
};


class SearchController {
    search(req: Request, res: Response, next: any) {
        const {
            q,
            type = 'post',
            sortBy = "relevance",
            sortType = 'desc',
            page = 1,
            limit = 7
        } = req.query
        console.log(req.query)
        if (type === "post") {
            //@ts-ignore
            searchPosts(q, sortBy, sortType, page, limit).then(resp => {
                res.status(200).send(resp)
            }).catch(err => next(err))
        } else if (type === "author") {
            //@ts-ignore
            UserService.findUserByFullName(q).then(resp => {
                res.status(200).send(resp)
            }).catch(err => next(err))
        }
    }

}
export default new SearchController()