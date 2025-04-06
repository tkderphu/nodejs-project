import { CHECK_IS_FOLLOWED_BEGIN, CHECK_IS_FOLLOWED_FAILED, CHECK_IS_FOLLOWED_SUCCESS, FETCH_FOLLOWERS_BEGIN, FETCH_FOLLOWERS_FAILED, FETCH_FOLLOWERS_SUCCESS, FETCH_FOLLOWING_BEGIN, FETCH_FOLLOWING_FAILED, FETCH_FOLLOWING_SUCCESS, FOLLOW_BEGIN, FOLLOW_FAILED, FOLLOW_SUCCESS, UNFOLLOW_BEGIN, UNFOLLOW_FAILED, UNFOLLOW_SUCCESS } from "../../action/follow/follow.action.type"


export const followUserReducer = (state : any = {}, action: any) => {
    switch(action.type) {
        case FOLLOW_BEGIN: {
            return {
                loading: true
            }
        }
        case FOLLOW_SUCCESS: {
            return {
                loading: false
            }
        }
        case FOLLOW_FAILED: {
            return  {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}
export const unfollowUserReducer = (state : any = {}, action: any) => {
    switch(action.type) {
        case UNFOLLOW_BEGIN: {
            return {
                loading: true
            }
        }
        case UNFOLLOW_SUCCESS: {
            return {
                loading: false
            }
        }
        case UNFOLLOW_FAILED: {
            return  {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}
export const checkFollowedUserReducer  = (state : any = {}, action: any) => {
    switch(action.type) {
        case CHECK_IS_FOLLOWED_BEGIN: {
            return {
                loading: true
            }
        }
        case CHECK_IS_FOLLOWED_SUCCESS: {
            return {
                loading: false,
                followed: action.payload
            }
        }
        case CHECK_IS_FOLLOWED_FAILED: {
            return  {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}

export const fetchFollowersReducer  = (state : any = {}, action: any) => {
    switch(action.type) {
        case FETCH_FOLLOWERS_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_FOLLOWERS_SUCCESS: {
            return {
                loading: false,
                followers: action.payload
            }
        }
        case FETCH_FOLLOWERS_FAILED: {
            return  {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}
export const fetchFollowingsReducer  = (state : any = {}, action: any) => {
    switch(action.type) {
        case FETCH_FOLLOWING_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_FOLLOWING_SUCCESS: {
            return {
                loading: false,
                followings: action.payload
            }
        }
        case FETCH_FOLLOWING_FAILED: {
            return  {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}