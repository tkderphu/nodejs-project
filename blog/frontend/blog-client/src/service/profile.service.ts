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

    getAuthorStats() {
        return api.get(`/authors/stats`)
    }
    updatePassword(req: any) {
        return api.put(`${url}/change-password`, req)
    }
}
export default new ProfileService()