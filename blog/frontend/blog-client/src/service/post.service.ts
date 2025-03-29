import api from "../interceptor/AxiosInterceptor"




class PostService {
    createPost(req: {title: string, description: string, content:string, taggingNames: string[], displayUrl: string}) {
        return api.post("/posts", req)
    }
    /**
     * get all postes by created date
     */
    fetchAllPost(req: any, page: number, limit: number) {
        console.log("req: ", req)
        return api.patch(`/posts?page=${page}&limit=${limit}`, req)
    }
}
export default new PostService()