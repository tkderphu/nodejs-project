import reportService, { ReportReq } from "../../../../service/report.service";
import { FETCH_LIST_REPORT_BEGIN, FETCH_LIST_REPORT_FALIED, FETCH_LIST_REPORT_SUCCESS, REPORT_BEGIN, REPORT_FALIED, REPORT_SUCCESS } from "./report.action.type";

export const reportAction = (req: ReportReq) => {
    return (dispatch: any)=> {
        dispatch({
            type: REPORT_BEGIN
        })
        reportService.report(req).then(resp => {
            dispatch({
                type:REPORT_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type: REPORT_FALIED,
                payload: err
            })
        })
    }
}

export const fetchListReportAction = (type: "POST" | "COMMENT",status?: "PENDING" | "RESOLVED" ) => {
    return (dispatch: any)=> {
        dispatch({
            type: FETCH_LIST_REPORT_BEGIN
        })
        reportService.getListReport(type, status).then(resp => {
            dispatch({
                type:FETCH_LIST_REPORT_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_LIST_REPORT_FALIED,
                payload: err
            })
        })
    }
}