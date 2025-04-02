import { FETCH_PROFILE_USER_BEGIN, FETCH_PROFILE_USER_FAILED, FETCH_PROFILE_USER_SUCCESS } from "../../action/profile/profile.action.type"

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