import followService from "../../../../service/follow.service"
import { CHECK_IS_FOLLOWED_USER_BEGIN, CHECK_IS_FOLLOWED_USER_FAILED, CHECK_IS_FOLLOWED_USER_SUCCESS, FETCH_FOLLOWERS_BEGIN, FETCH_FOLLOWERS_FAILED, FETCH_FOLLOWERS_SUCCESS, FETCH_FOLLOWING_BEGIN, FETCH_FOLLOWING_FAILED, FETCH_FOLLOWING_SUCCESS, FOLLOW_USER_BEGIN, FOLLOW_USER_FAILED, FOLLOW_USER_SUCCESS, UNFOLLOW_USER_BEGIN, UNFOLLOW_USER_FAILED, UNFOLLOW_USER_SUCCESS } from "./follow.action.type"

export const followUserAction = (userId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: FOLLOW_USER_BEGIN
        })
        followService.followUser(userId).then(response => {
            dispatch({
                type: FOLLOW_USER_SUCCESS
            })
            dispatch(checkFollowedUserAction(userId))
        }).catch(err => {
            dispatch({
                type: FOLLOW_USER_FAILED,
                payload: err
            })
        })
    }
}
export const unfollowUserAction = (userId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: UNFOLLOW_USER_BEGIN
        })
        followService.followUser(userId).then(response => {
            dispatch({
                type: UNFOLLOW_USER_SUCCESS
            })
            dispatch(checkFollowedUserAction(userId))
        }).catch(err => {
            dispatch({
                type: UNFOLLOW_USER_FAILED,
                payload: err
            })
        })
    }
}
export const checkFollowedUserAction = (userId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: CHECK_IS_FOLLOWED_USER_BEGIN
        })
        followService.checkCurrentUserFollowedUserId(userId).then(response => {
            const data = response.data;
            dispatch({
                type: CHECK_IS_FOLLOWED_USER_SUCCESS,
                payload: data
            })
        }).catch(err => {
            dispatch({
                type: CHECK_IS_FOLLOWED_USER_FAILED,
                payload: err
            })
        })
    }
}

export const fetchFollowersAction = (userId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_FOLLOWERS_BEGIN
        })
        followService.checkCurrentUserFollowedUserId(userId).then(response => {
            const data = response.data;
            dispatch({
                type: FETCH_FOLLOWERS_SUCCESS,
                payload: data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_FOLLOWERS_FAILED,
                payload: err
            })
        })
    }
}
export const fetchFollowingsAction = (userId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_FOLLOWING_BEGIN
        })
        followService.checkCurrentUserFollowedUserId(userId).then(response => {
            const data = response.data;
            dispatch({
                type: FETCH_FOLLOWING_SUCCESS,
                payload: data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_FOLLOWING_FAILED,
                payload: err
            })
        })
    }
}