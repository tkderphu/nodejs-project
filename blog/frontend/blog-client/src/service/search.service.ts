import api from "../interceptor/AxiosInterceptor"

class SearchService {
    

    search(search: any) {
        return api.get(`/search${search}`)
    }

}
export default new SearchService()