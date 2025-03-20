import { TaggingRepository } from "../../db/mongo"

class TaggingService {

    async save(taggingNames: string[]) {
        const result = []
        console.log("taggings: ", taggingNames)
        for(let i = 0; i < taggingNames.length; i++) {
            let x = taggingNames[i]
            let tagging = await this.findByName(x)
            if(!tagging) {
                const insertVal = await TaggingRepository.insertOne({
                    name: x
                })
                tagging = {
                    _id: insertVal.insertedId,
                    name: x
                }
            }
            result.push(tagging)
        }
        console.log('tagging: ', result)
        return result
        
    }

    findByName(taggingId?: string) {
        return TaggingRepository.findOne({
            name: taggingId
        })
    }

}
export default new TaggingService()