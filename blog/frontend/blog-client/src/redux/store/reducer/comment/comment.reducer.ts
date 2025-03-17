import { CREATE_COMMENT_BEGIN, CREATE_COMMENT_SUCCESS } from "../../action/comment/comment.action.type"
import { CREATE_POST_FAILED } from "../../action/post/post.action.type"


const createCommentState: any = {
    hasError: false,
    loading: false,
    error: '',
    path: '',
    message:'',
    status: '',
}
export const createCommentReducer = (state = createCommentState, action: any) => {
    switch(action.type) {
        case CREATE_COMMENT_BEGIN:
            return {
                ...state,
                loading: true
            }
        case CREATE_COMMENT_SUCCESS:
            return {
                hasError: false,
                loading: false,
                error: '',
                path: '',
                message:'',
                status: '',
            }
        case CREATE_POST_FAILED:
            return {
                hasError: false,
                loading: false,
                error: action.error,
                path: action.path,
                message:action.message,
                status: action.status,
            }
        default: return state
    }
}
