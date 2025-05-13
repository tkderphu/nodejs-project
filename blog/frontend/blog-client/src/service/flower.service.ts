import api from "../interceptor/AxiosInterceptor"

export interface Flower {
    _id: string,
    userId: string,
    numberFlower: number
}
class FlowerService {
    getFlowerByUser() {
        return api.get("/flowers/user")
    }
}
export default new FlowerService()