import api from "../interceptor/AxiosInterceptor"

export interface SeriesCreateReq {
    title?: string
    content?: string
    tagNames?: string[],
    displayUrl?: string,
    description?: string
}
class SeriesService {
    save(req: SeriesCreateReq) {
        return api.post("/series", req)
    }
    getListSeries() {
        return api.get("/series")
    }
}
export default new SeriesService()