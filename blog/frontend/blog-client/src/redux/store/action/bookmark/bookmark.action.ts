import bookmarkService from "../../../../service/bookmark.service"
import { fetchPostAction } from "../post/post.action"
import { CHECK_BOOKMARKED_BEGIN, CHECK_BOOKMARKED_FAILED, CHECK_BOOKMARKED_SUCCESS, FETCH_BOOKMARK_BEGIN, FETCH_BOOKMARK_FAILED, FETCH_BOOKMARK_SUCCESS, POP_POST_FROM_BOOKMARK_BEGIN, POP_POST_FROM_BOOKMARK_FAILED, POP_POST_FROM_BOOKMARK_SUCCESS, PSUH_POST_TO_BOOKMARK_BEGIN, PSUH_POST_TO_BOOKMARK_FAILED, PSUH_POST_TO_BOOKMARK_SUCCESS } from "./bookmark.action.type"

export const checkBookmarkedAction = (userId: string, objId: string, objType: "POST" | "SERIES") => {
    return (dispatch: any) => {
        dispatch({
            type: CHECK_BOOKMARKED_BEGIN
        })
        bookmarkService.checkBoormarked(userId, objId, objType).then(resp => {
            console.log("check bookmark: ", resp)
            dispatch({
                payload: resp.data,
                type: CHECK_BOOKMARKED_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type: CHECK_BOOKMARKED_FAILED,
                payload: err
            })
        })
    }
}
export const pushPostToBookmarkedAction = (objId: string, objType: "POST" | "SERIES") => {
    return (dispatch: any) => {
        dispatch({
            type: PSUH_POST_TO_BOOKMARK_BEGIN
        })
        bookmarkService.save(objId, objType).then(resp => {
            dispatch({
                type: PSUH_POST_TO_BOOKMARK_SUCCESS
            })
            if(objType === "POST") {
                dispatch(fetchPostAction(objId))
            }
        }).catch(err => {
            dispatch({
                type: PSUH_POST_TO_BOOKMARK_FAILED,
                payload: err
            })
        })
    }
}
export const popPostFromBookmarkedAction = (objId: string, objType: "POST" | "SERIES") => {
    return (dispatch: any) => {
        dispatch({
            type: POP_POST_FROM_BOOKMARK_BEGIN
        })
        bookmarkService.delete(objId, objType).then(resp => {
            console.log("delete bookmark:", resp.data)
            dispatch({
                type: POP_POST_FROM_BOOKMARK_SUCCESS
            })
            if(objType === "POST") {
                dispatch(fetchPostAction(objId))
            }
        }).catch(err => {
            dispatch({
                type: POP_POST_FROM_BOOKMARK_FAILED,
                payload: err
            })
        })
    }
}

export const fetchBookmarkAction = (userId: string, objType: string) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_BOOKMARK_BEGIN
        })
        bookmarkService.getBookmarks(userId, objType).then(resp => {
            console.log("resp bookmark: ", resp.data)
            dispatch({
                type: FETCH_BOOKMARK_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_BOOKMARK_FAILED,
                payload: err
            })
        })
    }
}