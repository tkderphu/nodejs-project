import { CREATE_SERIES_BEGIN, CREATE_SERIES_FAILED, CREATE_SERIES_SUCCESS, FETCH_SERIES_BEGIN, FETCH_SERIES_FAILED, FETCH_SERIES_SUCCESS } from "../../action/series/series.action.type";

export const createSeriesReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case CREATE_SERIES_BEGIN: {
            return {
                loading: true
            }
        }
        case CREATE_SERIES_SUCCESS: {
            return {
                loading: false,
            }
        }
        case CREATE_SERIES_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}

export const fetchSeriesReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_SERIES_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_SERIES_FAILED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        case FETCH_SERIES_SUCCESS: {
            return {
                loading: false,
                series: action.payload
            }
        }
        default: return state
    }
}