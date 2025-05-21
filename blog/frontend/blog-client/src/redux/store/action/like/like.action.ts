import likeService from "../../../../service/like.service"
import { fetchPostAction } from "../post/post.action"
import { CHECK_LIKE_BEGIN, CHECK_LIKE_FAILED, CHECK_LIKE_SUCCESS, LIKE_BEGIN, LIKE_FAILED, LIKE_SUCCESS, UNLIKE_BEGIN, UNLIKE_FAILED, UNLIKE_SUCCESS } from "./like.action.type"

export const likeAction = (objId: string, objType: "POST" | "SERIES" | "COMMENT") => {
    return (dispatch: any) => {
        dispatch({
            type: LIKE_BEGIN
        })
        likeService.like(objId, objType).then(resp => {
            if (objType === "POST") {
                dispatch(fetchPostAction(objId))
            }
            dispatch({
                type: LIKE_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type: LIKE_FAILED,
                payload: err
            })
        })
    }
}
export const unlikeAction = (objId: string, objType: "POST" | "SERIES" | "COMMENT") => {
    return (dispatch: any) => {
        dispatch({
            type: UNLIKE_BEGIN
        })
        likeService.unlike(objId, objType).then(resp => {
            if (objType === "POST") {
                dispatch(fetchPostAction(objId))
            }
            dispatch({
                type: UNLIKE_SUCCESS
            })

        }).catch(err => {
            dispatch({
                type: UNLIKE_FAILED,
                payload: err
            })
        })
    }
}

export const checkLikeAction = (userId: string, objId: string, objType: "POST" | "SERIES" | "COMMENT") => {
    return (dispatch: any) => {
        dispatch({
            type: CHECK_LIKE_BEGIN
        })
        likeService.checkLike(userId, objId, objType).then(resp => {
            console.log("check like: ", resp.data)
            dispatch({
                type: CHECK_LIKE_SUCCESS,
                payload: resp.data
            })

        }).catch(err => {
            dispatch({
                type: CHECK_LIKE_FAILED,
                payload: err
            })
        })
    }
}