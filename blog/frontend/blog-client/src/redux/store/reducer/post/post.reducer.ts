import { CREATE_POST_BEGIN, CREATE_POST_FAILED, CREATE_POST_SUCCESS, FETCH_ALL_POST_BEGIN, FETCH_ALL_POST_FAILED, FETCH_ALL_POST_SUCCESS, FETCH_POST_BEGIN, FETCH_POST_BY_AUTHOR_BEGIN, FETCH_POST_BY_AUTHOR_FAILED, FETCH_POST_BY_AUTHOR_SUCCESS, FETCH_POST_FAILED, FETCH_POST_SUCCESS, UNLOCK_POST_BEGIN, UNLOCK_POST_FAILED, UNLOCK_POST_SUCCESS } from "../../action/post/post.action.type";

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


export const fetchPostByAuthorIdReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_POST_BY_AUTHOR_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_POST_BY_AUTHOR_SUCCESS: {
            return {
                loading: false,
                posts: action.payload
            }
        }
        case FETCH_POST_BY_AUTHOR_FAILED: {
            return {
                loading: false,
                hasError: true,
                err: action.payload
            }
        }
        default: return state
    }
}



export const unlockPostReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case UNLOCK_POST_BEGIN: {
            return {
                loading: true
            }
        }
        case UNLOCK_POST_SUCCESS: {
            return {
                loading: false
            }
        }
        case UNLOCK_POST_FAILED: {
            return {
                loading: false,
                hasError: true,
                message: action.payload.response.data
            }
        }
        default: return state
    }
}


export const fetchUnlockPostReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case UNLOCK_POST_BEGIN: {
            return {
                loading: true
            }
        }
        case UNLOCK_POST_SUCCESS: {
            return {
                loading: false,
                unlock: action.payload
            }
        }
        case UNLOCK_POST_FAILED: {
            return {
                loading: false,
                hasError: true,
                message: action.payload.response.data
            }
        }
        default: return state
    }
}



export const fetchAllPostReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_ALL_POST_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_ALL_POST_SUCCESS: {
            return {
                loading: false,
                pageResult: action.payload
            }
        }
        case FETCH_ALL_POST_FAILED: {
            return {
                loading: false,
                hasError: true,
                message: action.payload.message
            }
        }
        default: return state
    }
}
export const fetchPostReducer = (state = {}, action: any) => {
    switch(action.type) {
        case FETCH_POST_BEGIN:
            return {loading: true}
        case FETCH_POST_SUCCESS:
            return {
                loading: false,
                post: action.payload
            }
        case FETCH_POST_FAILED:
            return {
                loading: false,
                error: action.payload,
                hasError: true
            }
        default: return state
    }
}