import seriesService, { SeriesCreateReq } from "../../../../service/series.service";
import { CREATE_SERIES_BEGIN, CREATE_SERIES_FAILED, CREATE_SERIES_SUCCESS, FETCH_SERIES_BEGIN, FETCH_SERIES_FAILED, FETCH_SERIES_SUCCESS } from "./series.action.type";

export const createSeriesAction = (req: SeriesCreateReq) => {
    return (dispatch: any) => {
        dispatch({
            type: CREATE_SERIES_BEGIN
        })
        seriesService.save(req).then(resp => {
            dispatch({
                payload: resp.data,
                type: CREATE_SERIES_SUCCESS
            })
            location.reload()
        }).catch(err => {
            dispatch({
                type: CREATE_SERIES_FAILED,
                payload: err
            })
        })
    }
}

export const fetchSereisAction = (sortDate: -1 | 1 = -1) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_SERIES_BEGIN
        })
        seriesService.getListSeries(sortDate).then(resp => {
            dispatch({
                payload: resp.data,
                type: FETCH_SERIES_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type: FETCH_SERIES_FAILED,
                payload: err
            })
        })
    }
}
