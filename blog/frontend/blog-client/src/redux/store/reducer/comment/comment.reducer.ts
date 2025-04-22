import { CREATE_COMMENT_BEGIN, CREATE_COMMENT_SUCCESS, FETCH_ALL_COMMENT_BEGIN, FETCH_ALL_COMMENT_FAILED, FETCH_ALL_COMMENT_SUCCESS, REMOVE_COMMENT_BEGIN, REMOVE_COMMENT_FAILED, REMOVE_COMMENT_SUCCESS } from "../../action/comment/comment.action.type"
import { CREATE_POST_FAILED } from "../../action/post/post.action.type"


export const createCommentReducer = (state : any = {}, action: any) => {
    switch(action.type) {
        case CREATE_COMMENT_BEGIN:
            return {
                ...state,
                loading: true
            }
        case CREATE_COMMENT_SUCCESS:
            return {
                loading: false
            }
        case CREATE_POST_FAILED:
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        default: return state
    }
}

export const fetchAllCommentReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_ALL_COMMENT_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_ALL_COMMENT_SUCCESS: {
            return {
                loading: false,
                comments: action.payload
            }
        }
        case FETCH_ALL_COMMENT_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}
export const removeCommentReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case REMOVE_COMMENT_BEGIN: {
            return {
                loading: true
            }
        }
        case REMOVE_COMMENT_SUCCESS: {
            return {
                loading: false
            }
        }
        case REMOVE_COMMENT_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
} 