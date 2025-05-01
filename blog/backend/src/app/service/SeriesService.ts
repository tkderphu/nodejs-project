import { SeriesRepository, TaggingRepository } from "../../db/mongo"
import { PageResult } from "../framework/common/page"
import { Series } from "../model/series"
import BookMarkService from "./BookMarkService"
import TaggingService from "./TaggingService"
import UserService from "./UserService"

class SeriesService {
    async save(userId: string, title: string, content: string, tagNames: string[], displayUrl: string, description: string) {
        const tags = await TaggingService.save(tagNames)
        const series: Series = {
            tags: tags,
            timestamps: {
                createdAt: new Date(),
                updatedAt: new Date()
            },
            userId: userId,
            content: content,
            title: title,
            displayUrl: displayUrl,
            description: description,
            bookmark: 0,
            comment: 0,
            like: 0,
            view: 0
        }

        await SeriesRepository.insertOne(series)
    }
    async getListSeries(page: number, limit: number, sortDate: -1 | 1) {

        const countDocuments = await SeriesRepository.countDocuments({})

        const totalPage = Math.ceil(countDocuments / limit)
        const skip = (page - 1) * limit

        let result = SeriesRepository.find({})
            .skip(skip)
            .sort({ 'timestamps.createdAt': sortDate })
            .limit(limit)

        let series: any = (await result.toArray())
        for (let i = 0; i < series?.length; i++) {
            series[i].user = await UserService.findById(series[i].userId)
            series[i].bookmark = await BookMarkService.countBookmark(series[i]._id.toString(), 'SERIES')
        }


        const pageResult: PageResult<Series> = {
            currentPage: page,
            list: series,
            totalPage: totalPage
        }

        return pageResult
    }
}
export default new SeriesService()