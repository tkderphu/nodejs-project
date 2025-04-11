import { SeriesRepository, TaggingRepository } from "../../db/mongo"
import { Series } from "../model/series"
import TaggingService from "./TaggingService"

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
            description: description
        }

        await SeriesRepository.insertOne(series)
    }
    getListSeries() {
        return SeriesRepository.find({}).sort({
            "timestamps.createdAt": -1
        }).toArray()
    }
}
export default new SeriesService()