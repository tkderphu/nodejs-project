import { ObjectId } from "mongodb"
import { TaggingRepository } from "../../db/mongo"

class TaggingService {

    save(taggingId: string) {
        return TaggingRepository.insertOne({
            name: taggingId
        })
    }
    async saveAll(taggingIds: string[]) {
        for(let taggingId of taggingIds) {
            const tagging = await this.findByName(taggingId)
            if(!tagging) {
                this.save(taggingId)
            }
        }
    }
    findByName(taggingId: string) {
        return TaggingRepository.findOne({
            name: taggingId
        })
    }

}
export default new TaggingService()