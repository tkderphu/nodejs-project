import api from "../interceptor/AxiosInterceptor"

const url = "/users"
class ProfileService {
    getProfile(userId: string) {
        return api.get(`${url}/${userId}`)
    }
}
export default new ProfileService()