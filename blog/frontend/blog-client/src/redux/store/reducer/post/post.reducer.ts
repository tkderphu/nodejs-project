import { CREATE_POST_BEGIN, CREATE_POST_FAILED, CREATE_POST_SUCCESS } from "../../action/post/post.action.type";

export const createPostReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case CREATE_POST_BEGIN: {
            return {
                loading: true
            }
        }
        case CREATE_POST_SUCCESS: {
            return {
                loading: false,
            }
        }
        case CREATE_POST_FAILED: {
            return {
                loading: false,
                hasError: true,
                status: action.payload.status,
                message: action.payload.message
            }
        }
        default: return state
    }
}