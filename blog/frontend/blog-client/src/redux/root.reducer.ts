import {combineReducers} from 'redux'
import { authForgetPasswordReducer, authLoginReducer, authRegisterReducer } from '../redux/store/reducer/auth/auth.reducer'
import { createCommentReducer } from './store/reducer/comment/comment.reducer'
import { createPostReducer } from './store/reducer/post/post.reducer'
const rootReducer = combineReducers({
    createComment: createCommentReducer,
    authForgetPassword: authForgetPasswordReducer,
    authLogin: authLoginReducer,
    authRegister: authRegisterReducer,
    createPost: createPostReducer
})

export default rootReducer