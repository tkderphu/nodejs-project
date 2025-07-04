import {combineReducers} from 'redux'
import { authForgetPasswordReducer, authLoginReducer, authRegisterReducer } from '../redux/store/reducer/auth/auth.reducer'
import { checkBookmarkedReducer, fetchBookmarkReducer, popPostFromBookmarkedReducer, pushPostToBookmarkedReducer } from './store/reducer/bookmark/bookmark.reducer'
import { createCommentReducer, fetchAllCommentReducer, removeCommentReducer } from './store/reducer/comment/comment.reducer'
import { checkFollowedUserReducer, fetchFollowersReducer, fetchFollowingsReducer, followUserReducer, unfollowUserReducer } from './store/reducer/follow/follow.reducer'
import { fetchGalleriesReducer } from './store/reducer/gallery/gallery.reducer'
import { checkLikeReducer, likeReducer, unlikeReducer } from './store/reducer/like/like.reducer'
import { countUnreadNotifyMessageReducer, fetchAllNotifyMessageReducer } from './store/reducer/notifyMessage/notify.message.reducer'
import { createPostReducer, fetchAllPostReducer, fetchPostByAuthorIdReducer, fetchPostReducer, fetchUnlockPostReducer, unlockPostReducer } from './store/reducer/post/post.reducer'
import { fetchProfileReducer, updatePasswordReducer, updateProfileSocialReducer, updateProfileUserInfoReducer } from './store/reducer/profile/profile.reducer'
import { fetchListReportReducer, reportReducer } from './store/reducer/report/reprot.reducer'
import { searchReducer } from './store/reducer/search/search.reducer'
import { createSeriesReducer, fetchSeriesReducer } from './store/reducer/series/series.reducer'
import { fetchSettingReducer, updateSettingNotifyReducer } from './store/reducer/setting/setting.reducer'
import { createPaymentReducer, fetchFlowerReducer, fetchTransactionReducer } from './store/reducer/transaction/transaction.reducer'
import { uploadReducer } from './store/reducer/upload/upload.reducer'
const rootReducer = combineReducers({
    createComment: createCommentReducer,
    fetchAllComment: fetchAllCommentReducer,
    removeComment: removeCommentReducer,
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
    fetchFlower: fetchFlowerReducer,
    fetchBookmark: fetchBookmarkReducer,
    unlockPost: unlockPostReducer,
    fetchSeries: fetchSeriesReducer,
    createSeries: createSeriesReducer,
    updateProfileSocial: updateProfileSocialReducer,
    updateProfileInfoUser: updateProfileUserInfoReducer,
    search: searchReducer,
    createPaymentUrl: createPaymentReducer,
    fetchPostUnlock: fetchUnlockPostReducer,
    fetchPostByAuthorId: fetchPostByAuthorIdReducer,
    like: likeReducer,
    unlike: unlikeReducer,
    checkLike: checkLikeReducer,
    fetchTransaction: fetchTransactionReducer,
    fetchSetting: fetchSettingReducer,
    updateSettingNotify: updateSettingNotifyReducer,
    updatePassword: updatePasswordReducer,
    report: reportReducer,
    fetchListReport: fetchListReportReducer
})

export default rootReducer