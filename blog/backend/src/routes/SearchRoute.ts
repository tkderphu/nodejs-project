import { Router } from "express";
import SearchController from "../app/controller/SearchController";
const searchRoute = Router()
searchRoute.get("/api/search", SearchController.search)
export default searchRoute