
import api from "../interceptor/AxiosInterceptor"

const URL = `follows`
class FollowService {
    follow(followObjectId: string, type: "USER" | "TAG") {
        return api.post(`/${URL}/${followObjectId}/${type}`)
    }
    unfollowObject(followObjectId: string, type: "USER" | "TAG") {
        return api.delete(`/${URL}/${followObjectId}/${type}`)
    }
    checkFollowedObject(followObjectId: string, type: "USER" | "TAG") {
        return api.get(`/${URL}/check/${followObjectId}/${type}`)
    }
    getListFollowers(userId: string) {
        return api.get(`${URL}/${userId}/followers`)
    }
    getListFollowing(userId: string) {
        return api.get(`${URL}/${userId}/followings`)
    }
}
export default new FollowService()