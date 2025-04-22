import commentService from "../../../../service/comment.service"
import { CREATE_COMMENT_BEGIN, CREATE_COMMENT_FAILED, CREATE_COMMENT_SUCCESS, FETCH_ALL_COMMENT_BEGIN, FETCH_ALL_COMMENT_FAILED, FETCH_ALL_COMMENT_SUCCESS, REMOVE_COMMENT_BEGIN, REMOVE_COMMENT_FAILED, REMOVE_COMMENT_SUCCESS } from "./comment.action.type"

export  const createCommentAction = (req: any) => {
    return (dispatch: any) => {
        dispatch({
            type: CREATE_COMMENT_BEGIN
        })
        commentService.createComment(req).then(response => {
            dispatch({
                type: CREATE_COMMENT_SUCCESS
            }),
            dispatch(fetchAllCommentAction(req.postId))
        }).catch(err => {
            dispatch({
                type: CREATE_COMMENT_FAILED,
                payload: err
            })
        })
    }
}


export const fetchAllCommentAction = (postId: any) => {
    return (dispatch: any) => {
        dispatch({
            type: FETCH_ALL_COMMENT_BEGIN
        })
        commentService.getAllCommentByPost(postId).then(response => {
            dispatch({
                type: FETCH_ALL_COMMENT_SUCCESS,
                payload: response.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_ALL_COMMENT_FAILED,
                payload: err
            })
        })
    }
}

export const removeCommentAction = (commentId: any, postId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: REMOVE_COMMENT_BEGIN
        })
        commentService.removeComment(commentId).then(response => {
            dispatch({
                type: REMOVE_COMMENT_SUCCESS
            })
            dispatch(fetchAllCommentAction(postId))
        }).catch(err => {
            dispatch({
                type: REMOVE_COMMENT_FAILED
            })
        })
    }
}