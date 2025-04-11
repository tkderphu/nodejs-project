import {combineReducers} from 'redux'
import { authForgetPasswordReducer, authLoginReducer, authRegisterReducer } from '../redux/store/reducer/auth/auth.reducer'
import { checkBookmarkedReducer, fetchBookmarkReducer, popPostFromBookmarkedReducer, pushPostToBookmarkedReducer } from './store/reducer/bookmark/bookmark.reducer'
import { createCommentReducer } from './store/reducer/comment/comment.reducer'
import { checkFollowedUserReducer, fetchFollowersReducer, fetchFollowingsReducer, followUserReducer, unfollowUserReducer } from './store/reducer/follow/follow.reducer'
import { fetchGalleriesReducer } from './store/reducer/gallery/gallery.reducer'
import { countUnreadNotifyMessageReducer, fetchAllNotifyMessageReducer } from './store/reducer/notifyMessage/notify.message.reducer'
import { createPostReducer, fetchAllPostReducer, fetchPostReducer } from './store/reducer/post/post.reducer'
import { fetchProfileReducer } from './store/reducer/profile/profile.reducer'
import { createSeriesReducer, fetchSeriesReducer } from './store/reducer/series/series.reducer'
import { uploadReducer } from './store/reducer/upload/upload.reducer'
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
    fetchProfile: fetchProfileReducer,
    countUnreadNotifyMessage: countUnreadNotifyMessageReducer,
    fetchAllNotifyMessage: fetchAllNotifyMessageReducer,
    fetchPost: fetchPostReducer,
    fetchGalleries: fetchGalleriesReducer,
    upload: uploadReducer,
    checkBookmarked: checkBookmarkedReducer,
    pushPostToBookmark: pushPostToBookmarkedReducer,
    popPostFromBookmark: popPostFromBookmarkedReducer,
    fetchBookmark: fetchBookmarkReducer,
    fetchSeries: fetchSeriesReducer,
    createSeries: createSeriesReducer
})

export default rootReducer