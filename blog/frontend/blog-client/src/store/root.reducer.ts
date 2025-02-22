import {combineReducers} from 'redux'
import { createCommentReducer } from './reducer/comment/comment.reducer'
import { authForgetPasswordReducer, authLoginReducer, authRegisterReducer } from './reducer/auth/auth.reducer'
const rootReducer = combineReducers({
    createComment: createCommentReducer,
    authForgetPassword: authForgetPasswordReducer,
    authLogin: authLoginReducer,
    authRegister: authRegisterReducer
})

export default rootReducer