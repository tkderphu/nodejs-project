import postService from "../../../../service/post.service"
import { CREATE_POST_BEGIN, CREATE_POST_FAILED, CREATE_POST_SUCCESS } from "./post.action.type"

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

/**
 * fetch all post
 */
const fetchAllPostBegin = () => {

}
const fetchAllPostSuccess = () => {
    
}
const fetchAllPostFailed = () => {
    
}
const fetchAllPostAction = () => {

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

