
import api from "../interceptor/AxiosInterceptor"
// import dotenv from 'dotenv'
// dotenv.config()
const URL = "process.env.BASE_API_URL"
class AuthService {
    login(req: any) {
        return api.post('/auth/login', req)
    }
    register(req: any) {
        return api.post(`/auth/register`, req)
    }
    refreshToken(req: any) {
        return api.post(`/auth/refresh-token`, req)
    }
    logout(accessToken: string) {
        return api.get(`/auth/logout?accessToken=${accessToken}`)
    }
    forgetPassword(email: string) {
        return api.get(`/auth/forget-password?email=${email}`)
    }
}
export default new AuthService()