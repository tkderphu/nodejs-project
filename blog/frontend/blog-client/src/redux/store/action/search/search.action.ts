import searchService from "../../../../service/search.service";
import { SEARCH_BEGIN, SEARCH_FAILED, SEARCH_SUCCESS } from "./search.type";

export const searchAction = (search: any) => {
    return (dispatch: any) => {
        dispatch({
            type: SEARCH_BEGIN
        })
        searchService.search(search).then(resp => {
            setTimeout(() => {
                dispatch({
                    type: SEARCH_SUCCESS,
                    payload: resp.data
                })
            }, 3000)
        }).catch(err => {
            dispatch({
                type: SEARCH_FAILED,
                payload: err
            })
        })
    }
}