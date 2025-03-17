import { CREATE_POST_BEGIN } from "./post.action.type"

const createPostBegin = () => {
    return {
        type: CREATE_POST_BEGIN
    }
}

const createPostSuccess = (response: any) => {
    return {
        type: CREATE_POST_BEGIN,
        payload: response
    }
}

const createPostFailed = (error: any, message: any, path: any, status: any) => {
    return {
        type: CREATE_POST_BEGIN,
        error, message, path, status
    }
}
const createPostAction = () => {

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

