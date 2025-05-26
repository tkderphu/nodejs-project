import { FETCH_PROFILE_USER_BEGIN, FETCH_PROFILE_USER_FAILED, FETCH_PROFILE_USER_SUCCESS, UPDATE_PASSWORD_BEGIN, UPDATE_PASSWORD_FAILED, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_INFO_USER_BEGIN, UPDATE_PROFILE_INFO_USER_FAILED, UPDATE_PROFILE_INFO_USER_SUCCESS, UPDATE_PROFILE_SOCIAL_PLATFORM_BEGIN, UPDATE_PROFILE_SOCIAL_PLATFORM_FAILED, UPDATE_PROFILE_SOCIAL_PLATFORM_SUCCESS } from "../../action/profile/profile.action.type"

export const fetchProfileReducer = (state : any = {}, action: any) => {
    switch(action.type) {
        case FETCH_PROFILE_USER_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_PROFILE_USER_SUCCESS: {
            return {
                loading: false,
                user: action.payload
            }
        }
        case FETCH_PROFILE_USER_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}


export const updatePasswordReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case UPDATE_PASSWORD_BEGIN: {
            return {loading: true}
        }
        case UPDATE_PASSWORD_SUCCESS: {
            return {
                loading: false,
                success: true
            }
        }
        case UPDATE_PASSWORD_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload,
                message: action.payload.response.data.error
            }
        }
        default: return state
    }
}

export const updateProfileUserInfoReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case UPDATE_PROFILE_INFO_USER_BEGIN: {
            return {loading: true}
        }
        case UPDATE_PROFILE_INFO_USER_SUCCESS: {
            return {
                loading: false
            }
        }
        case UPDATE_PROFILE_INFO_USER_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}

export const updateProfileSocialReducer = (state : any = {}, action: any) => {
    switch(action.type) {
        case UPDATE_PROFILE_SOCIAL_PLATFORM_BEGIN: {
            return {
                loading: true
            }
        }
        case UPDATE_PROFILE_SOCIAL_PLATFORM_SUCCESS: {
            return {
                loading: false
            }
        }
        case UPDATE_PROFILE_SOCIAL_PLATFORM_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}
