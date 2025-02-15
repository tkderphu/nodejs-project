import { Request, Response } from "express"
import TaggingService from "../service/TaggingService"

class TaggingController {
    private taggingService = TaggingService

    createTagging(req: Request, res: Response) {

    }

    getTaggingList(req: Request, res: Response) {
        
    }
}   

export default new TaggingController()