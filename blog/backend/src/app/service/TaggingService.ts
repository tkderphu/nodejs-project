import { ObjectId } from "mongodb"
import { TaggingRepository } from "../../db/mongo"
import { Tagging } from "../model/tagging"

class TaggingService {

    async save(tagging: Tagging[]) {
        const result = []
        for(let x of tagging) {
            let tagging = await this.findByName(x.name)
            if(!tagging) {
                const insertVal = await TaggingRepository.insertOne({
                    name: x.name
                })
                tagging = {
                    _id: insertVal.insertedId,
                    name: x.name
                }
            }
            result.push(tagging)
        }
        return result
        
    }

    findByName(taggingId?: string) {
        return TaggingRepository.findOne({
            name: taggingId
        })
    }

}
export default new TaggingService()