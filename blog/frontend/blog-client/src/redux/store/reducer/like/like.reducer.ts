import { CHECK_LIKE_BEGIN, CHECK_LIKE_FAILED, CHECK_LIKE_SUCCESS, LIKE_BEGIN, LIKE_FAILED, LIKE_SUCCESS, UNLIKE_BEGIN, UNLIKE_FAILED, UNLIKE_SUCCESS } from "../../action/like/like.action.type";

export const likeReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case LIKE_BEGIN: {
            return {
                loading: true
            }
        }
        case LIKE_SUCCESS: {
            return {
                loading: false
            }
        }
        case LIKE_FAILED: {
            return {
                loading: false,
                error: action.payload,
                hasError: true
            }
        }
        default: return state
    }
}



export const unlikeReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case UNLIKE_BEGIN: {
            return {
                loading: true
            }
        }
        case UNLIKE_SUCCESS: {
            return {
                loading: false
            }
        }
        case UNLIKE_FAILED: {
            return {
                loading: false,
                error: action.payload,
                hasError: true
            }
        }
        default: return state
    }
}


export const checkLikeReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case CHECK_LIKE_BEGIN: {
            return {
                loading: true
            }
        }
        case CHECK_LIKE_SUCCESS: {
            return {
                loading: false,
                success: action.payload
            }
        }
        case CHECK_LIKE_FAILED: {
            return {
                loading: false,
                error: action.payload,
                hasError: true
            }
        }
        default: return state
    }
}

