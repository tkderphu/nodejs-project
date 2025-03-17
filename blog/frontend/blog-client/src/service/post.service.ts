import api from "../interceptor/AxiosInterceptor"

class PostService {
    createPost(req: any) {
        return api.post("/posts", req)
    }
}
export default new PostService()