import {combineReducers} from 'redux'
import { authForgetPasswordReducer, authLoginReducer, authRegisterReducer } from '../redux/store/reducer/auth/auth.reducer'
import { createCommentReducer } from './store/reducer/comment/comment.reducer'
const rootReducer = combineReducers({
    createComment: createCommentReducer,
    authForgetPassword: authForgetPasswordReducer,
    authLogin: authLoginReducer,
    authRegister: authRegisterReducer
})

export default rootReducer