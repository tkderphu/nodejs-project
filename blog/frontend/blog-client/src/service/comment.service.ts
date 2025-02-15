import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()


const URL = `${process.env.BASE_URL_API}/comments`
class CommentService {
    createComment(req: any) {
       return axios.post(URL, req)
    }
    getAllCommentByPost(postId: any) {
        return axios.get(`${URL}/post/${postId}`)
    }
    removeComment(commentId: any) {
        return axios.delete(`${URL}/${commentId}`)
    }

}
export default new CommentService()