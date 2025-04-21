import profileService from "../../../../service/profile.service"
import { FETCH_ALL_COMMENT_FAILED } from "../comment/comment.action.type"
import { FETCH_PROFILE_USER_BEGIN, FETCH_PROFILE_USER_FAILED, FETCH_PROFILE_USER_SUCCESS, UPDATE_PROFILE_INFO_USER_BEGIN, UPDATE_PROFILE_INFO_USER_FAILED, UPDATE_PROFILE_INFO_USER_SUCCESS, UPDATE_PROFILE_SOCIAL_PLATFORM_BEGIN, UPDATE_PROFILE_SOCIAL_PLATFORM_FAILED, UPDATE_PROFILE_SOCIAL_PLATFORM_SUCCESS } from "./profile.action.type"

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

export const updateProfileSocialAction = (userId: string, req: any) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_PROFILE_SOCIAL_PLATFORM_BEGIN
        })
        profileService.updateSocialPlatform(req).then(resp => {
            dispatch(fetchProfileAction(userId))
            dispatch({
                type: UPDATE_PROFILE_SOCIAL_PLATFORM_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: UPDATE_PROFILE_SOCIAL_PLATFORM_FAILED,
                payload: err
            })
        })
    } 
}

export const updateProfileUserInfoAction = (userId: string, req: any) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_PROFILE_INFO_USER_BEGIN,
        })
        profileService.updateProfileUserInfo(req).then(resp => {
            dispatch({
                type: UPDATE_PROFILE_INFO_USER_SUCCESS
            })
            dispatch(fetchProfileAction(userId))
        }).catch(err => {
            dispatch({
                type: UPDATE_PROFILE_INFO_USER_FAILED,
                payload: err
            })
        })
    }
}