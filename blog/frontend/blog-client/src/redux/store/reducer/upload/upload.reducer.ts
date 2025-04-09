import { UPLOAD_BEGIN, UPLOAD_FAILED, UPLOAD_SUCCESS } from "../../action/upload/upload.type";

export const uploadReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case UPLOAD_BEGIN: {
            return {
                loading: true
            }
        }
        case UPLOAD_SUCCESS: {
            return {
                loading: false
            }
        }
        case UPLOAD_FAILED: {
            return {
                loading: false,
                error: action.payload,
                hasError: true
            }
        }
        default: return state
    }
} 