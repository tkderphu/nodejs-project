import { ObjectId } from "mongodb"
import { TaggingRepository } from "../../db/mongo"
import { Tagging } from "../model/tagging"

class TaggingService {

    save(tagging: Tagging) {
        return TaggingRepository.insertOne({
            ...tagging,
            _id: new ObjectId(tagging._id)
        })
    }
    
}
export default new TaggingService()