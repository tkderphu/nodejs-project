
import api from '../interceptor/AxiosInterceptor'


const PATH = "/comments"
class CommentService {
    createComment(req: any) {
       return api.post(PATH, req)
    }
    getAllCommentByPost(postId: any) {
        return api.get(`${PATH}/post/${postId}`)
    }
    removeComment(commentId: any) {
        return api.delete(`${PATH}/${commentId}`)
    }

}
export default new CommentService()