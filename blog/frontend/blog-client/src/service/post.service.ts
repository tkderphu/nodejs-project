import api from "../interceptor/AxiosInterceptor"




class PostService {
    createPost(req: {title: string, description: string, content:string, taggingNames: string[], displayUrl: string}) {
        return api.post("/posts", req)
    }
}
export default new PostService()