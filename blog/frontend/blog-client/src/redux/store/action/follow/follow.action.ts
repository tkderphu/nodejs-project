import followService from "../../../../service/follow.service"
import { CHECK_IS_FOLLOWED_BEGIN, CHECK_IS_FOLLOWED_FAILED, CHECK_IS_FOLLOWED_SUCCESS, FETCH_FOLLOWERS_BEGIN, FETCH_FOLLOWERS_FAILED, FETCH_FOLLOWERS_SUCCESS, FETCH_FOLLOWING_BEGIN, FETCH_FOLLOWING_FAILED, FETCH_FOLLOWING_SUCCESS, FOLLOW_BEGIN, FOLLOW_FAILED, FOLLOW_SUCCESS, UNFOLLOW_BEGIN, UNFOLLOW_FAILED, UNFOLLOW_SUCCESS } from "./follow.action.type"
export const followObjectAction = (followObjectId: string, type: "USER" | "TAG") => {
    return (dispatch: any) => {
        dispatch({
            type: FOLLOW_BEGIN
        })
        followService.follow(followObjectId, type).then(response => {
            dispatch({
                type: FOLLOW_SUCCESS
            })
            console.log("vcl: ", response)
            dispatch(checkFollowedUserAction(followObjectId, type))
        }).catch(err => {
            dispatch({
                type: FOLLOW_FAILED,
                payload: err
            })
        })
    }
}
export const unfollowObjectAction = (followObjectId: string, type: "USER" | "TAG") => {
    return (dispatch: any) => {
        dispatch({
            type: UNFOLLOW_BEGIN
        })
        followService.unfollowObject(followObjectId, type).then(response => {
            dispatch({
                type: UNFOLLOW_SUCCESS
            })
            //@ts-ignore
            dispatch(checkFollowedUserAction(followObjectId, type))
        }).catch(err => {
            dispatch({
                type: UNFOLLOW_FAILED,
                payload: err
            })
        })
    }
}
export const checkFollowedUserAction = (followObjectId: string, type: "USER" | "TAG") => {
    return (dispatch: any) => {
        dispatch({
            type: CHECK_IS_FOLLOWED_BEGIN
        })
        followService.checkFollowedObject(followObjectId, type).then(response => {
            const data = response.data;
            dispatch({
                type: CHECK_IS_FOLLOWED_SUCCESS,
                payload: data
            })
        }).catch(err => {
            dispatch({
                type: CHECK_IS_FOLLOWED_FAILED,
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
        // followService.checkCurrentUserFollowedUserId(userId).then(response => {
        //     const data = response.data;
        //     dispatch({
        //         type: FETCH_FOLLOWERS_SUCCESS,
        //         payload: data
        //     })
        // }).catch(err => {
        //     dispatch({
        //         type: FETCH_FOLLOWERS_FAILED,
        //         payload: err
        //     })
        // })
    }
}
export const fetchFollowingsAction = (userId: string, type: any) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_FOLLOWING_BEGIN
        })
        followService.getListFollowing(userId, type).then(res => {
            dispatch({
                type: FETCH_FOLLOWERS_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_FOLLOWERS_FAILED,
                payload: err
            })
        })
    }
}