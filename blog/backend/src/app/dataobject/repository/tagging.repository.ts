import { ObjectId } from "mongodb"
import db from "../../../db/mongo"
import { Tagging } from "../model/tagging"

class TaggingRepository {
    private taggingCollection = db.collection('tagging')

    save(tagging: Tagging) {
        return this.taggingCollection.insertOne({
            ...tagging,
            _id: new ObjectId(tagging._id)
        })
    }
}
export default new TaggingRepository()