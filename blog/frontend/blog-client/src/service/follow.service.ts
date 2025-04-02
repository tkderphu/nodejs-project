
import api from "../interceptor/AxiosInterceptor"

const URL = `/follows`
class FollowService {
    followUser(userId: string) {
        return api.post(`/${URL}/${userId}`)
    }
    unfollowUser(userId: string) {
        return api.delete(`/${URL}/${userId}`)
    }
    checkCurrentUserFollowedUserId(userId: string) {
        return api.get(`/${URL}/check/${userId}`)
    }
    getListFollowers(userId: string) {
        return api.get(`${URL}/${userId}/followers`)
    }
    getListFollowing(userId: string) {
        return api.get(`${URL}/${userId}/followings`)
    }
}
export default new FollowService()