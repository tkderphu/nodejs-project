import api from "../interceptor/AxiosInterceptor"

class UploadService {
    upload(formData: FormData) {
        return api.post("/uploads", formData)
    }
}
export default new UploadService()