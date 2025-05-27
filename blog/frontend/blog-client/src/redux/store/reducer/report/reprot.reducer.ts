import { FETCH_LIST_REPORT_BEGIN, FETCH_LIST_REPORT_FALIED, FETCH_LIST_REPORT_SUCCESS, REPORT_BEGIN, REPORT_FALIED, REPORT_SUCCESS } from "../../action/report/report.action.type";

export const reportReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case REPORT_BEGIN: {
            return {
                loading: true
            }
        }
        case REPORT_SUCCESS: {
            return {
                loading: false,
                success: true
            }
        }
        case REPORT_FALIED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}

export const fetchListReportReducer = (state: any = {}, action: any) => {
    switch(action.type) {
        case FETCH_LIST_REPORT_BEGIN: {
            return {
                loading: true
            }
        }
        case FETCH_LIST_REPORT_SUCCESS: {
            return {
                loading: false,
                reports: action.payload
            }
        }
        case FETCH_LIST_REPORT_FALIED: {
            return {
                loading: false,
                hasError: true,
                error: action.payload
            }
        }
        default: return state
    }
}