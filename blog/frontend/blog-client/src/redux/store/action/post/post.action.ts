import postService from "../../../../service/post.service"
import { CREATE_POST_BEGIN, CREATE_POST_FAILED, CREATE_POST_SUCCESS, FETCH_ALL_POST_BEGIN, FETCH_ALL_POST_FAILED, FETCH_ALL_POST_SUCCESS, FETCH_POST_BEGIN, FETCH_POST_FAILED, FETCH_POST_SUCCESS } from "./post.action.type"

export const createPostAction = (req: { title: string; description: string; content: string; taggingNames: string[]; displayUrl: string; }) => {
    return (dispatch: any) => {
        dispatch({
            type: CREATE_POST_BEGIN
        })
        setTimeout(() => {
            postService.createPost(req).then(response => {
                dispatch({
                    type: CREATE_POST_SUCCESS
                })
            }).catch(err => {
                dispatch({
                    type: CREATE_POST_FAILED,
                    payload: {
                        message: err.message,
                        status: err.status
                    }
                })
            })
        }, 3000)
    }
}


export const fetchAllPostAction = (req: {taggingNames?: string[], timestamp?: {startDate: any, endDate: any}, userId?: string, keyword?: string},
    page: number = 1, limit: number = 7) => {
    console.log("request: ", req)
    return (dispatch: any) => {
        dispatch({
            type: FETCH_ALL_POST_BEGIN
        })
        postService.fetchAllPost(req, page, limit).then(response => {
            console.log("request: ", req)
            console.log("fetch post:", response.data)
            dispatch({
                type: FETCH_ALL_POST_SUCCESS,
                payload: response.data
            })
        }).catch(err => {
            dispatch({
                type: FETCH_ALL_POST_FAILED,
                payload: {
                    code: err.status,
                    message: err.message
                }
            })
        })
    }
}


export const fetchPostAction = (id: string) =>{
    return (dispatch: any) => {
        console.log("fetch")
        dispatch({
            type: FETCH_POST_BEGIN
        })
        postService.fetchPost(id).then(resp => {
            console.log("data: ", resp.data)
            dispatch({
                type: FETCH_POST_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            console.log("error")
            dispatch({
                type: FETCH_POST_FAILED,
                payload: err
            })
        })
    }
}


/**
 * fetch all post by user
 */
const fetchAllPostByUserBegin = () => {

}
const fetchAllPostByUserSuccess = () => {
    
}
const fetchAllPostByUserFailed = () => {
    
}
const fetchAllPostByUserAction = () => {

}


const removePostBegin = () => {

}
const removePostSuccess = () => {

}
const removePostFailed = () => {

}
export const removePostAction = (postId: any) => {
    
}

