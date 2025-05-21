import api from "../interceptor/AxiosInterceptor"

class LikeService {
    like(objId: string, objType: "POST" | "SERIES" | "COMMENT") {
        return api.post(`/likes/${objId}/${objType}`)
    }
    unlike(objId: string, objType: "POST" | "SERIES" | "COMMENT") {
        return api.delete(`/likes/${objId}/${objType}`)
    }

    checkLike(userId: string, objId: string, objType: "POST" | "SERIES" | "COMMENT") {
        return api.get(`/likes/check/${userId}/${objId}/${objType}`)
    }

}
export default new LikeService()