
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
    getListFollowers(userId: string, type: "USER" | "TAG") {
        return api.get(`${URL}/${userId}/followers/${type}`)
    }
    getListFollowing(userId: string, type: "USER" | "TAG") {
        return api.get(`${URL}/${userId}/followings/${type}`)
    }
}
export default new FollowService()