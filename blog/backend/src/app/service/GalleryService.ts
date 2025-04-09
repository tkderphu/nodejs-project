import { GalleryRepository } from "../../db/mongo"

class GalleryService {
    async save(userId: string, imageUrl: string) {
        const result = await  GalleryRepository.insertOne({
            userId: userId,
            imageUrl: imageUrl
        })

        return result
    }
    getListGallery(userId: string) {
        return GalleryRepository.find({
            userId: userId
        }).toArray()
    }
}
export default new GalleryService()