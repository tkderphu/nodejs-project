import {combineReducers} from 'redux'
import { authForgetPasswordReducer, authLoginReducer, authRegisterReducer } from '../redux/store/reducer/auth/auth.reducer'
import { createCommentReducer } from './store/reducer/comment/comment.reducer'
import { checkFollowedUserReducer, fetchFollowersReducer, fetchFollowingsReducer, followUserReducer, unfollowUserReducer } from './store/reducer/follow/follow.reducer'
import { createPostReducer, fetchAllPostReducer } from './store/reducer/post/post.reducer'
import { fetchProfileReducer } from './store/reducer/profile/profile.reducer'
const rootReducer = combineReducers({
    createComment: createCommentReducer,
    authForgetPassword: authForgetPasswordReducer,
    authLogin: authLoginReducer,
    authRegister: authRegisterReducer,
    createPost: createPostReducer,
    fetchAllPost: fetchAllPostReducer,
    followUser: followUserReducer,
    unfollowUser: unfollowUserReducer,
    checkFollowedUser: checkFollowedUserReducer,
    fetchFollowers: fetchFollowersReducer,
    fetchFollowings: fetchFollowingsReducer,
    fetchProfile: fetchProfileReducer

})

export default rootReducer