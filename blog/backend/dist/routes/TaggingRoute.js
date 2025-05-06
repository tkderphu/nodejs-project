import { Router } from "express";
import TaggingController from "../app/controller/TaggingController";
const taggingRouter = Router();
taggingRouter.post('/api/taggings', TaggingController.createTagging);
taggingRouter.post('/api/taggings', TaggingController.getTaggingList);
export default taggingRouter;
