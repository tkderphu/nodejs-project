
import { SEARCH_BEGIN, SEARCH_FAILED,SEARCH_SUCCESS } from "../../action/search/search.type";

export const searchReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case SEARCH_BEGIN: {
            return {
                loading: true
            }
        }
        case SEARCH_SUCCESS: {
            return {
                loading: false,
                pageResult: action.payload
            }
        }
        case SEARCH_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}