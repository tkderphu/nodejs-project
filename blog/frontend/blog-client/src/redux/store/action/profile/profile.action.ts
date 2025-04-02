import profileService from "../../../../service/profile.service"
import { FETCH_ALL_COMMENT_FAILED } from "../comment/comment.action.type"
import { FETCH_PROFILE_USER_BEGIN, FETCH_PROFILE_USER_FAILED, FETCH_PROFILE_USER_SUCCESS } from "./profile.action.type"

export const fetchProfileAction = (userId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_PROFILE_USER_BEGIN
        })
        profileService.getProfile(userId).then(resp => {
            dispatch({
                type: FETCH_PROFILE_USER_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_PROFILE_USER_FAILED,
                payload: err
            })
        })
    } 
}