import { FETCH_GALLERIES_BEGIN, FETCH_GALLERIES_FAILED, FETCH_GALLERIES_SUCCESS } from "../../action/gallery/gallery.action.type";

export const fetchGalleriesReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_GALLERIES_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_GALLERIES_SUCCESS: {
            return {
                loading: false,
                galleries: action.payload
            }
        }
        case FETCH_GALLERIES_FAILED: {
            return {
                loading: false,
                error: action.payload,
                hasError: true
            }
        }
        default: return state
    }
}