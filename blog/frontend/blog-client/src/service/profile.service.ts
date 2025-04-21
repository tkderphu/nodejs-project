import api from "../interceptor/AxiosInterceptor"

const url = "/users"
class ProfileService {
    getProfile(userId: string) {
        return api.get(`${url}/${userId}`)
    }
    updateSocialPlatform(req: any) {
        return api.put(`${url}/social`, req)
    }
    updateProfileUserInfo(req: any) {
        return api.put(`${url}`, req)
    }
}
export default new ProfileService()