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
    getListSeries(sortDate: number) {
        return api.get(`/series?sortDate=${sortDate}`)
    }
}
export default new SeriesService()