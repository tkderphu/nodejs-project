import commentService from "../../../service/comment.service"
import { CREATE_COMMENT_BEGIN, CREATE_COMMENT_FAILED, CREATE_COMMENT_SUCCESS } from "./comment.action.type"


const createCommentBegin = () => {
    return {
        type: CREATE_COMMENT_BEGIN
    }
}
const createCommentSuccess = (response: any) => {
    return {
        type: CREATE_COMMENT_SUCCESS,
        payload: response
    }
}
const createCommentFailed = (err: any, message: any, path: any, status: any) => {
    return {
        type: CREATE_COMMENT_FAILED,
        err, message, path, status
    }
}

/**Create comment action
 * @param
 * @returns 
 */
export const createCommentAction = () => {
    const body = {}
    return (dispatch: any) => {
        dispatch(createCommentBegin())
        commentService.createComment(body).then(response => {
            dispatch(createCommentSuccess(response.data))
            dispatch(fetchAllCommentAction(body.postId))
        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                dispatch(createCommentFailed(err, "Your token is expired, please login", '', 401))
            } else {

            }
        })
    }
}
 
const fetchAllCommentBegin = () => {
    return {

    }
}
const fetchAllCommentSuccess = (response: any) => {
    return {
        
        payload: response
    }
}

const fetchAllCommentFailed =(err: any, message: any, path: any, status: any) => {
    return {

    }
}
const fetchAllCommentAction = (postId: any) => {
    return (dispatch: any) => {
        dispatch(fetchAllCommentBegin())
        commentService.getAllCommentByPost(postId).then(response => {
            if(response.data.error) {

            } else {
                dispatch(fetchAllCommentSuccess(response.data))
            }
        }).catch(err => {

        })
    }
}
const removeCommentBegin = () => {
    return {

    }
}
const removeCommentSuccess = () => {
    return {

    }
}
const removeCommentError = (err: any, message: any, path: any, status: any)  => {
    return {

    }   
}
const removeCommentAction = (commentId: any, postId: any) => {
    return (dispatch: any) => {
        commentService.removeComment(commentId).then(response => {
            if(response.data.error) {
                
            } else {
                dispatch(removeCommentSuccess())
                dispatch(fetchAllCommentAction(postId))
            }
        })
    }
}