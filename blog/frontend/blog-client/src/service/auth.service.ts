import axios from "axios"

const URL = process.env.BASE_API_URL
class AuthService {
    login(req: any) {
        return axios.post(`${URL}/auth/login`, req)
    }
    register(req: any) {
        return axios.post(`${URL}/auth/register`, req)
    }
    refreshToken(req: any) {
        return axios.post(`${URL}/auth/refresh-token`, req)
    }
    logout(accessToken: string) {
        return axios.get(`${URL}/auth/logout?accessToken=${accessToken}`)
    }
    forgetPassword(email: string) {
        return axios.get(`${URL}/auth/forget-password?email=${email}`)
    }
}
export default new AuthService()