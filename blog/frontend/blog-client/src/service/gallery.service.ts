import api from "../interceptor/AxiosInterceptor"

class GalleryService {
    getListGallery() {
        return api.get("/galleries/user")
    }
}
export default new GalleryService()