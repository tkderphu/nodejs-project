
import { Router } from "express";
import SeriesController from "../app/controller/SeriesController";
import { authMiddleWare } from "../middleware/middleware";
const seriesRouter = Router()

seriesRouter.post(`/api/series`, authMiddleWare ,SeriesController.createSeries)
seriesRouter.get(`/api/series`, authMiddleWare, SeriesController.getListSeries)

export default seriesRouter