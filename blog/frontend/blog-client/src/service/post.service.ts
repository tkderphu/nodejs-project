import api from "../interceptor/AxiosInterceptor"

class PostService {
    createPost(req: {title: string, description: string, content:string, taggingNames: string[], displayUrl: string}) {
        return api.post("/posts", req)
    }
    /**
     * get all postes by created date
     */
    fetchAllPost(search: string, page: number, limit: number) {
        return api.get(`/posts?page=${page}&limit=${limit}&${search}`)
    }
    fetchPost(id: string) {
        return api.get(`/posts/${id}`)
    }

    unlockPost(postId: string) {
        return api.post(`/posts/${postId}/unlock`)
    }
    fetchUnlockPost(postId: string) {
        return api.get(`/posts/${postId}/unlock`)
    }
}
export default new PostService()